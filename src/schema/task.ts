import {NAME_LENGTH, DEFAULT_LENGTH} from '../config';
import Joi from 'joi';

const task = Joi.object({
  name: Joi.string()
      .required()
      .max(NAME_LENGTH),
  description: Joi.string()
      .required()
      .allow('')
      .max(DEFAULT_LENGTH),
});

export default task;
