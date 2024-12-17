import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  STRIPE_SECRECT_KEY: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
  STRIPE_ENDPOINT_SECRECT: string;
  STRIPE_ENDPOINT_SECRECT_TESTING: string;
  NATS_SERVERS: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRECT_KEY: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_ENDPOINT_SECRECT: joi.string().required(),
    STRIPE_ENDPOINT_SECRECT_TESTING: joi.string().required(),
    NATS_SERVERS: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  stripeSecretKey: envVars.STRIPE_SECRECT_KEY,
  stripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
  stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
  stripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRECT,
  stripeEndpointSecretTesting: envVars.STRIPE_ENDPOINT_SECRECT_TESTING,
  natsServers: envVars.NATS_SERVERS,
};
