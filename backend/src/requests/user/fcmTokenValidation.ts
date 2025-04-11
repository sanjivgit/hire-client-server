import Joi from "joi";

// Schema for storing/updating FCM token
export const storeFcmTokenValidation = Joi.object({
  token: Joi.string().required().trim().min(10).messages({
    "string.base": "Token must be a string",
    "string.empty": "Token is required",
    "string.min": "Token must be at least 10 characters long",
    "any.required": "Token is required"
  }),
  device_id: Joi.string().trim().allow(null, '').messages({
    "string.base": "Device ID must be a string"
  }),
  is_active: Joi.boolean().default(true).messages({
    "boolean.base": "Is active must be a boolean"
  })
});

// Schema for updating FCM token status
export const updateTokenStatusValidation = Joi.object({
  token: Joi.string().required().trim().min(10).messages({
    "string.base": "Token must be a string",
    "string.empty": "Token is required",
    "string.min": "Token must be at least 10 characters long",
    "any.required": "Token is required"
  }),
  is_active: Joi.boolean().required().messages({
    "boolean.base": "Is active must be a boolean",
    "any.required": "Is active status is required"
  })
});

// Schema for deleting FCM token
export const deleteTokenValidation = Joi.object({
  token: Joi.string().required().trim().min(10).messages({
    "string.base": "Token must be a string",
    "string.empty": "Token is required",
    "string.min": "Token must be at least 10 characters long",
    "any.required": "Token is required"
  })
}); 