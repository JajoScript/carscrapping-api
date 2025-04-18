import 'dotenv/config';
import * as joi from 'joi';

// -- Validación de las variables de entorno.
export interface Env {
  FIREBASE_TYPE: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_PRIVATE_KEY_ID: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_CLIENT_ID: string;
  FIREBASE_AUTH_URI: string;
  FIREBASE_TOKEN_URI: string;
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
  FIREBASE_CLIENT_X509_CERT_URL: string;
  FIREBASE_UNIVERSE_DOMAIN: string;
  FIREBASE_DATABASE_URL: string;
}

const schema: joi.Schema<Env> = joi
  .object({
    FIREBASE_TYPE: joi.string().required(),
    FIREBASE_PROJECT_ID: joi.string().required(),
    FIREBASE_PRIVATE_KEY_ID: joi.string().required(),
    FIREBASE_PRIVATE_KEY: joi.string().required(),
    FIREBASE_CLIENT_EMAIL: joi.string().required(),
    FIREBASE_CLIENT_ID: joi.string().required(),
    FIREBASE_AUTH_URI: joi.string().required(),
    FIREBASE_TOKEN_URI: joi.string().required(),
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: joi.string().required(),
    FIREBASE_CLIENT_X509_CERT_URL: joi.string().required(),
    FIREBASE_UNIVERSE_DOMAIN: joi.string().required(),
    FIREBASE_DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const validationResult = schema.validate(process.env);
const error = validationResult.error;
const value = validationResult.value as Env;

if (error) {
  throw new Error(
    `Problemas al cargar las variables de entorno: ${error.message}`,
  );
}

// -- Exportación 🚀.
const vars: Env = value;
export const env: Env = {
  FIREBASE_TYPE: vars.FIREBASE_TYPE,
  FIREBASE_PROJECT_ID: vars.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID: vars.FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY: vars.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL: vars.FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID: vars.FIREBASE_CLIENT_ID,
  FIREBASE_AUTH_URI: vars.FIREBASE_AUTH_URI,
  FIREBASE_TOKEN_URI: vars.FIREBASE_TOKEN_URI,
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL:
    vars.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_CLIENT_X509_CERT_URL: vars.FIREBASE_CLIENT_X509_CERT_URL,
  FIREBASE_UNIVERSE_DOMAIN: vars.FIREBASE_UNIVERSE_DOMAIN,
  FIREBASE_DATABASE_URL: vars.FIREBASE_DATABASE_URL,
};
