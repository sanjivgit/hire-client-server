"use strict";

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import CommonRes from "../utils/commonResponse";
import { resMessage } from "../responseMessage/commonMessage";
import { resObj } from "../utils/types";

class Middleware {
  private initMsg;
  constructor() {
    this.initMsg = "Token";
  }

  //// Generate the temperaury token
  jwtSign = (authData: any) => {
    const secret = process.env.SECRET_KEY || "xyz";

    return jwt.sign(
      {
        authData,
      },
      secret,
      { expiresIn: "7d" }
    );
  };

  //// Verify the generated token
  jwtVerify = async (req: Request, res: Response, next: NextFunction) => {
    const resObj: resObj = {
      apiId: "Not related to APIs",
      action: "Token Verification",
      version: "1.0",
    };
    const secret = process.env.SECRET_KEY || "xyz";
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader?.split(" ")[0];

    if (token && typeof token !== "undefined") {
      try {
        const data: any = await jwt.verify(token, secret);
        req.body.user = data?.authData;
        return next();
      } catch (error: any) {
        return CommonRes.UNAUTHORISED(
          resMessage(this.initMsg).INVALID,
          resObj,
          req,
          res
        );
      }
    } else {
      return CommonRes.UNAUTHORISED(
        resMessage(this.initMsg).NOT_FOUND,
        resObj,
        req,
        res
      );
    }
  };

  //// Verify isAdmin the generated token
  jwtVerifyIsAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const resObj: resObj = {
      apiId: "Not related to APIs",
      action: "Token Verification",
      version: "1.0",
    };
    const secret = process.env.SECRET_KEY || "xyz";
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader?.split(" ")[0];

    if (token && typeof token !== "undefined") {
      try {
        const data: any = await jwt.verify(token, secret);
        if (!data?.authData?.is_admin) {
          return CommonRes.UNAUTHORISED(
            "You Are Not Authorised",
            resObj,
            req,
            res
          );
        }
        req.body.user = data?.authData;
        return next();
      } catch (error: any) {
        return CommonRes.UNAUTHORISED(
          resMessage(this.initMsg).INVALID,
          resObj,
          req,
          res
        );
      }
    } else {
      return CommonRes.UNAUTHORISED(
        resMessage(this.initMsg).NOT_FOUND,
        resObj,
        req,
        res
      );
    }
  };
}

export default Middleware;
