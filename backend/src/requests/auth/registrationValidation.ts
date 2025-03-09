import Joi from "joi";

export interface LoginRequestData {
  fullName: string;
  phone: string;
  password: string;
  confirm_password: string;
}

export const registrationValidation = Joi.object({
  fullName: Joi.string().min(5).max(50).required(),
  phone: Joi.number().required(),
  password: Joi.string().required(),
  otp: Joi.string().required()
});
