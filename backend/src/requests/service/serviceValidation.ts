import Joi from "joi";

export const createServiceValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  service_type_id: Joi.number().required().messages({
    "number.base": "Service type ID must be a number",
    "any.required": "Service type ID is required",
  }),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
});

export const updateServiceValidation = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "Name cannot be empty",
  }),
  service_type_id: Joi.number().optional().messages({
    "number.base": "Service type ID must be a number",
  }),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
}); 