import 'dotenv/config';
import * as joi from 'joi';

// -- Validación de las variables de entorno.
export interface Env {
  FIREBASE_PROJECT_ID: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_CLIENT_EMAIL: string;
}

const schema: joi.Schema<Env> = joi
  .object({
    FIREBASE_PROJECT_ID: joi.string().required(),
    FIREBASE_PRIVATE_KEY: joi.string().required(),
    FIREBASE_CLIENT_EMAIL: joi.string().required(),
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
export const env = {
  FIREBASE_PROJECT_ID: vars.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY: vars.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL: vars.FIREBASE_CLIENT_EMAIL,
};
