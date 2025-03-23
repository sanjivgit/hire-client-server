import Joi from "joi";

// Validation for creating a new accepted service
export const createAcceptedServiceValidation = Joi.object({
  partner_id: Joi.number().required().messages({
    "number.base": "Partner ID must be a number",
    "any.required": "Partner ID is required",
  }),
  service_request_id: Joi.number().required().messages({
    "number.base": "Service request ID must be a number",
    "any.required": "Service request ID is required",
  }),
  description: Joi.string().allow(null, '').optional(),
  amount: Joi.number().allow(null).optional().min(0).messages({
    "number.base": "Amount must be a number",
    "number.min": "Amount must be a positive number",
  }),
});

// Validation for updating an accepted service
export const updateAcceptedServiceValidation = Joi.object({
  status: Joi.string().valid('pending', 'in-progress', 'completed', 'rejected').required().messages({
    "string.base": "Status must be a string",
    "any.required": "Status is required",
    "any.only": "Status must be one of: pending, in-progress, completed, rejected",
  }),
  amount: Joi.number().allow(null).optional().min(0).messages({
    "number.base": "Amount must be a number",
    "number.min": "Amount must be a positive number",
  }),
  description: Joi.string().allow(null, '').optional(),
});

// Validation for date range filtering
export const dateRangeValidation = Joi.object({
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional().greater(Joi.ref('start_date')).messages({
    "date.greater": "End date must be after start date",
  }),
}); 