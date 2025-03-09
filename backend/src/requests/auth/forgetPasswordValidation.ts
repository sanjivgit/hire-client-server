import Joi from "joi";

export interface LoginRequestData {
  phone: string;
  password: string;
}

export const forgetPasswordValidation = Joi.object({
  phone: Joi.number().required(),
  password: Joi.string().required(),
  otp: Joi.string().required()
});
