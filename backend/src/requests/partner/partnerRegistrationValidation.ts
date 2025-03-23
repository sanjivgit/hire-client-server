import Joi from "joi";

export const partnerRegistrationValidation = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  service_type_id: Joi.number().required(),
  service_ids: Joi.array().items(Joi.number()).required(),
  aadhar_number: Joi.string().required(),
  aadhar_image_id: Joi.number().required(),
  additional_document_id: Joi.number().required(),
});