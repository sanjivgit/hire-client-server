import Joi from "joi";

export const createServiceRequestValidation = Joi.object({
  user_id: Joi.number().required().messages({
    "number.base": "User ID must be a number",
    "any.required": "User ID is required",
  }),
  service_id: Joi.number().required().messages({
    "number.base": "Service ID must be a number",
    "any.required": "Service ID is required",
  }),
  description: Joi.string().allow("", null).optional().messages({
    "string.base": "Description must be a string",
  }),
});

export const updateServiceRequestValidation = Joi.object({
  service_id: Joi.number().optional().messages({
    "number.base": "Service ID must be a number",
  }),
  description: Joi.string().allow("", null).optional().messages({
    "string.base": "Description must be a string",
  }),
});

export const dateRangeValidation = Joi.object({
  start_date: Joi.date().optional().messages({
    "date.base": "Start date must be a valid date",
  }),
  end_date: Joi.date().optional().messages({
    "date.base": "End date must be a valid date",
  }),
}); 