import Joi from "joi";

export const partnerRegistrationValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  serviceTypeId: Joi.number().required(),
  serviceIds: Joi.array().items(Joi.number()).required(),
  aadharNumber: Joi.string().required(),
  aadharImageId: Joi.number().required(),
  additionalDocumentId: Joi.number().required(),
});