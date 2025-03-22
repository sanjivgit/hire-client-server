import CommonRes from "../../utils/commonResponse";
import { resObj } from "../../utils/types";
import { resMessage } from "../../responseMessage/commonMessage";
import AuthDao from "../../dao/auth/authDao";
import { loginValidation } from "../../requests/auth/loginValidation";
import { registrationValidation } from "../../requests/auth/registrationValidation";
import { forgetPasswordValidation } from "../../requests/auth/forgetPasswordValidation";
import { Request, Response } from "express";
import LoginDto from "../../dto/response/auth/loginDto";
import RegistrationDto from "../../dto/request/auth/registrationDto";

/**
 * | Author- Sanjiv Kumar
 * | Created for- Authentication
 * | Created Date- 09-03-2025
 * | Status - Done
 */

class AuthController {
  private dao: AuthDao;
  private initMsg: string;
  constructor() {
    this.dao = new AuthDao();
    this.initMsg = "User";
  }

  // registration
  registration = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {

      
      const { error } = registrationValidation.validate(req.body);
      
      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      
      /* Verifing the opt sent on given phone number */
      const otpVerify = await this.dao.verifyPhoneOtp(
        String(req.body.phone),
        String(req.body.otp)
      );

      if (otpVerify === null) {
        return CommonRes.VALIDATION_ERROR(
          "Wrong OTP entered!!!",
          resObj,
          req,
          res
        );
      } else if (!otpVerify) {
        return CommonRes.VALIDATION_ERROR(
          "OTP has been expired!!!",
          resObj,
          req,
          res
        );
      }
      
      const registrationDto = new RegistrationDto(req.body);

      ////////// Checking user already exist or not ?? If no then continue otherwise throw error message
      const isExist = await this.dao.getUserByPhone(registrationDto.phone);

      if (isExist) {
        return CommonRes.CONFLICT_ERROR(
          "Your Phone Number is Aleady Registered",
          resObj,
          req,
          res
        );
      }

      ////////// Registering User //////////
      const data = await this.dao.register(registrationDto);

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).REGISTER,
        data,
        resObj,
        req,
        res
      );

    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  // Login
  login = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      const { error } = loginValidation.validate(req.body);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, req, res);

      const data = await this.dao.login(req.body);

      if (data === false)
        return CommonRes.NOT_FOUND(
          "You have entered wrong password",
          data,
          resObj,
          req,
          res
        );

      if (data === null)
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          req,
          res
        );

      const loginDto = new LoginDto(data);

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).LOGIN,
        loginDto,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  /// Send OTP on Mail
  sendMailOtp = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      await this.dao.sendMailOtp(req.body.email);

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).OTP_SENT,
        null,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  /// Verify OTP on Mail
  verifyMailOtp = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      const data = await this.dao.verifyMailOtp(req.body.email, req.body.otp);

      if (data === null) {
        return CommonRes.VALIDATION_ERROR(
          "Wrong OTP entered!!!",
          resObj,
          req,
          res
        );
      } else if (!data) {
        return CommonRes.VALIDATION_ERROR(
          "OTP has been expired!!!",
          resObj,
          req,
          res
        );
      }

      return CommonRes.SUCCESS(
        "OTP validated successfully!!!",
        data,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  /// Send OTP on Phone
  sendPhoneOtp = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      ////////// Checking user already exist or not ?? If no then continue otherwise throw error message
      const isExist = await this.dao.getUserByPhone(String(req.body.phone));

      if (isExist) {
        return CommonRes.CONFLICT_ERROR(
          "Your Phone Number is Aleady Registered",
          resObj,
          req,
          res
        );
      }


      const response = await this.dao.sendPhoneOtp(req.body.phone);

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).OTP_SENT,
        response,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  /// Verify OTP on Phone
  verifyPhoneOtp = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      const data = await this.dao.verifyPhoneOtp(req.body.phone, req.body.otp);

      if (data === null) {
        return CommonRes.VALIDATION_ERROR(
          "Wrong OTP entered!!!",
          resObj,
          req,
          res
        );
      } else if (!data) {
        return CommonRes.VALIDATION_ERROR(
          "OTP has been expired!!!",
          resObj,
          req,
          res
        );
      }

      return CommonRes.SUCCESS(
        "OTP validated successfully!!!",
        data,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  ////// Forgeting Password ///////
  forget = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      const { error } = forgetPasswordValidation.validate(req.body);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, req, res);

      /* Verifing the opt sent on given phone number */
      const otpVerify = await this.dao.verifyPhoneOtp(
        req.body.phone,
        req.body.otp
      );

      if (otpVerify === null) {
        return CommonRes.VALIDATION_ERROR(
          "Wrong OTP entered!!!",
          resObj,
          req,
          res
        );
      } else if (!otpVerify) {
        return CommonRes.VALIDATION_ERROR(
          "OTP has been expired!!!",
          resObj,
          req,
          res
        );
      }

      ////////// Checking user already exist or not ?? If no then continue otherwise throw error message
      const isExist = await this.dao.getUserByPhone(req.body.phone);

      if (!isExist) {
        return CommonRes.VALIDATION_ERROR(
          "Your Phone Number is Not Registered",
          resObj,
          req,
          res
        );
      }

      /* Changing password here */
      const data = await this.dao.forgetPassword({
        phone: req.body.phone,
        password: req.body.password,
      });
      return CommonRes.SUCCESS(
        "Your Password Changed Successfully!!",
        data,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default AuthController;
