import Joi from "joi";

export const updateUserValidation = Joi.object({
  name: Joi.string().min(3).max(50),
  profile_pic: Joi.number().optional(),
  address: Joi.object({
    address: Joi.string().min(5).max(200).required(),
    pincode: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
    state: Joi.string().min(2).max(50).required(),
    district: Joi.string().min(2).max(50).required()
  })
}).min(1); // At least one field must be provided 