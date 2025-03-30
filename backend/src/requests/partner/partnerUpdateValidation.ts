import Joi from "joi";

export const partnerUpdateValidation = Joi.object({
  id: Joi.number().required().messages({
    'any.required': 'Partner ID is required',
    'number.base': 'Partner ID must be a number'
  }),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  service_type_id: Joi.number().optional(),
  service_ids: Joi.array().items(Joi.number()).optional(),
  aadhar_number: Joi.string().optional(),
  aadhar_image_id: Joi.number().optional(),
  additional_document_id: Joi.number().optional(),
  user_id: Joi.number().required().messages({
    'any.required': 'User ID is required',
    'number.base': 'User ID must be a number'
  })
}).min(2).message('At least one field besides ID must be provided for update'); 