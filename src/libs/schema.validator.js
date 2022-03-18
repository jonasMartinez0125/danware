import Joi from 'joi';

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(30),
});

const productSchema = Joi.object({
    name: Joi.string().trim().required(),
    price: Joi.number().positive().min(1).required(),
    description: Joi.string().trim(),
    quantity: Joi.number().positive().integer().min(1).required()
});

export { userSchema, productSchema };