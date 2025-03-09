import Joi from "joi";

export interface LoginRequestData {
  phone: string;
  password: string;
}

export const loginValidation = Joi.object({
  phone: Joi.number().required(),
  password: Joi.string().required(),
});
