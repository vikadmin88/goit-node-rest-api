import Joi from "joi";


export const registerShm = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string()
});

export const loginShm = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const sbscrUpdateShm = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});

