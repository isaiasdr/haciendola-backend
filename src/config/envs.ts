import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  API_VERSION: number;
  JWT_SECRET: string;
  APP_MODE: string;
  FRONTEND_URL: string;
  NODEMAILER_HOST: string;
  NODEMAILER_PORT: number;
  NODEMAILER_USER: string;
  NODEMAILER_PASSWORD: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    API_VERSION: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    APP_MODE: joi.string().required(),
    FRONTEND_URL: joi.string().required(),
    NODEMAILER_HOST: joi.string().required(),
    NODEMAILER_PORT: joi.number().required(),
    NODEMAILER_USER: joi.string().required(),
    NODEMAILER_PASSWORD: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  api_version: envVars.API_VERSION,
  jwt_secret: envVars.JWT_SECRET,
  app_mode: envVars.APP_MODE,
  frontend_url: envVars.FRONTEND_URL,
  nodemailer_host: envVars.NODEMAILER_HOST,
  nodemailer_port: envVars.NODEMAILER_PORT,
  nodemailer_user: envVars.NODEMAILER_USER,
  nodemailer_password: envVars.NODEMAILER_PASSWORD,
};
