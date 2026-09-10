import Joi from 'joi';

export const createOrderValidation = Joi.object({
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
  }).required(),
  paymentMethod: Joi.string().valid('stripe', 'cash').default('stripe'),
});