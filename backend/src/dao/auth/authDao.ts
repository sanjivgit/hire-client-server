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

  constructor() {
    this.middleware = new Middleware();
    this.users = db.users;
    this.otps = db.otps;
    this.roles = db.roles;
    this.sequelize = db.sequelize;
  }

  getUserByPhone = async (phone: string) => {
    const user = await this.users.findOne({
      where: { phone },
      attributes: ['id']
    });

    return generateRes(user);
  };

  register = async (credentials: any) => {
    const { fullName, phone, password } = credentials;
    const hashPassword = await bcrypt.hash(password, 10);
    
    const user = await this.users.create({
      name: fullName,
      phone: String(phone),
      password: hashPassword
    });

    return generateRes(user);
  };

  login = async (credentials: any) => {
    const t = await this.sequelize.transaction();

    try {
      const { password, phone } = credentials;
      const user = await this.users.findOne({
        where: { phone: String(phone) },
        attributes: ['id', 'name', 'phone', 'address', 'password'],
        include: [
          {
            model: this.roles,
            as: 'role',
            attributes: ['role'],
          },
        ],
        transaction: t
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
        const { password, ...others } = user.get({ plain: true });
        const token = this.middleware.jwtSign(others);

        // Update the token in the database
        await this.users.update(
          { token },
          { 
            where: { id: user.id },
            transaction: t
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
      otp
    });
  };

  verifyMailOtp = async (email: string, otp: string) => {
    const data = await this.otps.findOne({
      where: {
        email,
        otp,
      }
    });

    if (data) {
      const createdAt: Date = data.createdAt;
      const currentTime: Date = new Date();
      const timeDifference: number = currentTime.getTime() - createdAt.getTime();

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
    const otp: string = String(generateOtp());

    // const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
    //   params: {
    //     authorization: process.env.FAST2SMS_API_KEY,
    //     variables_values: `${otp}`,
    //     route: "otp",
    //     numbers: phone,
    //   },
    // });

    const res = await this.otps.create({
      phone: String(phone),
      otp: "123456"
    });

    return generateRes(res);
  };

  verifyPhoneOtp = async (phone: string, otp: string) => {
    const data = await this.otps.findOne({
      where: {
        phone,
        otp,
      }
    });

    if (data) {
      const createdAt: Date = data.createdAt;
      const currentTime: Date = new Date();
      const timeDifference: number = currentTime.getTime() - createdAt.getTime();

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
