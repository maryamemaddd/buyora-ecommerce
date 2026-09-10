import Joi from 'joi';

export const createProductValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().valid('Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other').required(),
  stock: Joi.number().integer().min(0).default(0),
  images: Joi.array().items(
    Joi.object({
      url: Joi.string().required()
    })
  ).optional(),
})

export const updateProductValidation = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).max(1000).optional(),
  price: Joi.number().positive().optional(),
  category: Joi.string().valid('Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other').optional(),
  stock: Joi.number().integer().min(0).optional(),
  isAvailable: Joi.boolean().optional(),
  images: Joi.array().items(
    Joi.object({
      url: Joi.string().required()
    })
  ).optional(),
}).options({ allowUnknown: true });