import Middleware from "../../middleware/middleware";
import nodemailer from "nodemailer";
import { generateRes } from "../../utils/generateRes";
import bcrypt from "bcrypt";
import axios from "axios";
import { generateOtp } from "../../utils/generateOtp";
const db = require("../../../db/models/index");

class AuthDao {
  private middleware: Middleware;
  private users: any;
  private otps: any;
  private roles: any;
  private sequelize: any;
  private partners: any;
  private services: any;
  private partners_services: any;

  constructor() {
    this.middleware = new Middleware();
    this.users = db.users;
    this.otps = db.otps;
    this.roles = db.roles;
    this.sequelize = db.sequelize;
    this.partners = db.partners;
    this.services = db.services;
    this.partners_services = db.partners_services;
  }

  getUserByPhone = async (phone: string) => {
    const user = await this.users.findOne({
      where: { phone },
      attributes: ["id"],
    });

    return generateRes(user);
  };

  register = async (credentials: any) => {
    const { name, phone, password } = credentials;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.users.create({
      name,
      phone: String(phone),
      password: hashPassword,
    });

    return generateRes(user);
  };

  login = async (credentials: any) => {
    const t = await this.sequelize.transaction();

    try {
      const { password, phone } = credentials;
      const rawQuery = `
    SELECT 
        u.id, 
        u.name, 
        u.profile_pic,
        u.phone,
        ft.token as fcm_token,  
        u.address, 
        u.password, 
        r.role AS role, 
        json_build_object(
          'id', p.id,
          'first_name', p.first_name,
          'last_name', p.last_name,
          'aadhar_image_id', p.aadhar_image_id,
          'status', p.status,
          'additional_document_id', p.additional_document_id,
          'aadhar_number', p.aadhar_number, 
          'service_type_id', p.service_type_id,
          'services', COALESCE(json_agg(
                json_build_object('id', s.id, 'name', s.name)
              ) FILTER (WHERE s.id IS NOT NULL), '[]'::json)
        ) AS partner
    FROM users u
    LEFT JOIN roles r ON u.id = r.user_id
    LEFT JOIN partners p ON u.id = p.user_id
    LEFT JOIN partner_services ps ON p.id = ps.partner_id
    LEFT JOIN services s ON ps.service_id = s.id
    LEFT JOIN fcm_tokens ft ON ft.user_id = u.id
    WHERE u.phone = :phone
    GROUP BY u.id, u.name, u.phone, u.address::text, u.password, r.role, p.id, p.service_type_id, ft.token;
  `;

      const [user] = await this.sequelize.query(rawQuery, {
        replacements: { phone },
        type: this.sequelize.QueryTypes.SELECT,
        transaction: t,
      });

      if (!user) {
        await t.rollback();
        return generateRes(null);
      }

      const isValidPassword: boolean = await bcrypt.compare(
        password,
        user.password
      );

      if (isValidPassword) {
        const { password, ...others } = user;
        const token = this.middleware.jwtSign(others);

        // Update the token in the database
        await this.users.update(
          { token },
          {
            where: { id: user.id },
            transaction: t,
          }
        );

        await t.commit();
        return generateRes({ ...others, token });
      }

      await t.rollback();
      return false;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  sendMailOtp = async (email: string) => {
    const otp: string = String(generateOtp());
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Verification",
      text: `Your otp is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    await this.otps.create({
      phone: "null",
      email,
      otp,
    });
  };

  verifyMailOtp = async (email: string, otp: string) => {
    const data = await this.otps.findOne({
      where: {
        email,
        otp,
      },
    });

    if (data) {
      const createdAt: Date = data.created_at;
      const currentTime: Date = new Date();
      const timeDifference: number =
        currentTime.getTime() - createdAt.getTime();

      await this.otps.destroy({
        where: {
          phone: data.phone,
          email: data.email,
        },
      });

      return timeDifference <= (Number(process.env.OTP_EXPIRY_TIME) || 120000);
    }
    return null;
  };

  sendPhoneOtp = async (phone: string) => {
    const data = await this.otps.findOne({
      where: {
        phone
      },
    });
    if (data) {
      const createdAt: Date = data.createdAt;
      const currentTime: Date = new Date();
      const timeDifference: number =
        currentTime.getTime() - createdAt.getTime();
      if (timeDifference <= (Number(process.env.OTP_EXPIRY_TIME))) {
        return generateRes(data)
      }
      await this.otps.destroy({
        where: {
          phone: data.phone,
        },
      });
    }

    const otp: string = String(generateOtp());

    // try {
    // const response = await axios.get("https://www.fast2sms.com/dev/whatsapp", {
    //   params: {
    //     authorization: process.env.FAST2SMS_API_KEY,
    //     message_id: 3572,
    //     variables_values: `${otp}`,
    //     numbers: phone,
    //   },
    // });

    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.FAST2SMS_API_KEY,
        variables_values: `${otp}`,
        numbers: phone,
        route: 'otp'
      },
    });

    // } catch (error) {
    //   console.error("Error sending OTP:", error);
    //   throw new Error("Failed to send OTP");
    // }



    const res = await this.otps.create({
      phone: String(phone),
      otp,
    });

    return generateRes(res);
  };

  verifyPhoneOtp = async (phone: string, otp: string) => {
    const data = await this.otps.findOne({
      where: {
        phone,
        otp,
      },
    });

    if (data) {
      const createdAt: Date = data.createdAt;
      const currentTime: Date = new Date();
      const timeDifference: number =
        currentTime.getTime() - createdAt.getTime();

      await this.otps.destroy({
        where: {
          phone: data.phone,
        },
      });

      return timeDifference <= (Number(process.env.OTP_EXPIRY_TIME) || 120000);
    }
    return null;
  };

  forgetPassword = async (credentials: any) => {
    const { phone, password } = credentials;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.users.update(
      { password: hashPassword },
      { where: { phone } }
    );

    return generateRes(user);
  };
}

export default AuthDao;
