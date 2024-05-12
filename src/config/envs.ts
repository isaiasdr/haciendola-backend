import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  API_VERSION: number;
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    API_VERSION: joi.number().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  api_version: envVars.API_VERSION,
  jwt_secret: envVars.JWT_SECRET,
};
