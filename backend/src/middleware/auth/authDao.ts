// import { PrismaClient } from "@prisma/client";
import Middleware from "../../middleware/middleware";
import nodemailer from "nodemailer";
import { generateRes } from "../../utils/generateRes";
import bcrypt from "bcrypt";
import axios from "axios";

// const prisma = new PrismaClient();

class AuthDao {
  private middleware: Middleware;
  constructor() {
    this.middleware = new Middleware();
  }

  getUserByPhone = async (phone: string) => {
    // const user = await prisma.users.findFirst({
    //   where: { phone },
    //   select: {
    //     id: true,
    //   },
    // });

    // return generateRes(user);
  };

  register = async (credentials: any) => {
    // const { full_name, phone, password } = credentials;
    // const hashPassword = await bcrypt.hash(password, 10);
    // const user = await prisma.users.create({
    //   data: {
    //     name: full_name,
    //     phone: String(phone),
    //     password: hashPassword,
    //   },
    // });

    // return generateRes(user);
  };

  login = async (credentials: any) => {
    // const { password, phone } = credentials;
    // const user = await prisma.users.findFirst({
    //   where: { phone: String(phone) },
    //   select: {
    //     id: true,
    //     name: true,
    //     phone: true,
    //     password: true,
    //     is_admin: true,
    //   },
    // });

    // if (!user) {
    //   return generateRes(null);
    // }

    // const isValidPassword: boolean = await bcrypt.compare(
    //   password,
    //   user.password
    // );
    // if (isValidPassword) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { password, ...others } = user;
    //   const token = this.middleware.jwtSign(others);

    //   return generateRes({ ...others, token });
    // }
    // return false;
  };

  ////// Sending OPT on mail ///////////
  sendMailOtp = async (email: string) => {
    // const otp: string = String(generateOtp());
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true, // Use `true` for port 465, `false` for all other ports
    //   auth: {
    //     user: process.env.MAIL_USER,
    //     pass: process.env.MAIL_PASS,
    //   },
    // });

    // const mailOptions = {
    //   from: process.env.MAIL_USER,
    //   to: email,
    //   subject: "Verification",
    //   text: `Your otp is ${otp}`,
    // };

    // transporter.sendMail(mailOptions).then(async () => {
    //   await prisma.otps.create({
    //     data: {
    //       email,
    //       phone: "null",
    //       otp,
    //     },
    //   });
    // });
  };

  ////////////// Verify Mail Otp
  verifyMailOtp = async (email: string, otp: string) => {
    // const data = await prisma.otps.findFirst({
    //   where: {
    //     email,
    //     otp,
    //   },
    // });

    // if (data && data?.created_at) {
    //   const createdAt: Date = new Date(data.created_at);

    //   const currentTime: Date = new Date();

    //   const timeDifference: number =
    //     currentTime.getTime() - createdAt.getTime();

    //   await prisma.otps.deleteMany({
    //     where: {
    //       email: data.email,
    //     },
    //   });

    //   return timeDifference <= (Number(process.env.OTP_EXPIRY_TIME) || 120000)
    //     ? true
    //     : false;
    // }
    // return null;
  };

  ////// Sending OPT on phone ///////////
  sendPhoneOtp = async (phone: string) => {
    // const otp: string = String(generateOtp());

    // const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
    //   params: {
    //     authorization: process.env.FAST2SMS_API_KEY,
    //     variables_values: `${otp}`,
    //     route: "otp",
    //     numbers: phone,
    //   },
    // });

    // const res = await prisma.otps.create({
    //   data: {
    //     phone: String(phone),
    //     otp,
    //   },
    // });

    // generateRes(res);
    // });
  };

  ////////////// Verify Mail Otp
  verifyPhoneOtp = async (phone: string, otp: string) => {
    // const data = await prisma.otps.findFirst({
    //   where: {
    //     phone,
    //     otp,
    //   },
    // });

    // if (data && data?.created_at) {
    //   const createdAt: Date = new Date(data.created_at);

    //   const currentTime: Date = new Date();

    //   const timeDifference: number =
    //     currentTime.getTime() - createdAt.getTime();

    //   await prisma.otps.deleteMany({
    //     where: {
    //       phone: data.phone,
    //     },
    //   });

    //   return timeDifference <= (Number(process.env.OTP_EXPIRY_TIME) || 120000)
    //     ? true
    //     : false;
    // }
    // return null;
  };

  //////////// Forget Password //////
  forgetPassword = async (credentials: any) => {
    // const { phone, password } = credentials;
    // const hashPassword = await bcrypt.hash(password, 10);
    // const user = await prisma.users.update({
    //   where: {
    //     phone,
    //   },
    //   data: {
    //     password: hashPassword,
    //   },
    // });

    // return generateRes(user);
  };
}

export default AuthDao;
