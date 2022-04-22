import {NAME_LENGTH, DEFAULT_LENGTH} from '../config';
import Joi from 'joi';

export const userRegisterSchema = Joi.object({
  name: Joi.string()
      .required()
      .max(NAME_LENGTH),
  password: Joi.string()
      .required()
      .max(DEFAULT_LENGTH),
  email: Joi.string()
      .required()
      .email({tlds: {allow: false}})
      .max(NAME_LENGTH),
});

export const userLoginSchema = Joi.object({
  password: Joi.string()
      .required()
      .max(DEFAULT_LENGTH),
  email: Joi.string()
      .required()
      .email({tlds: {allow: false}})
      .max(NAME_LENGTH),
});


