import { config } from "dotenv";

config({ path: "./.env" });

export const {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRATION_TIME,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
  PAYSTACK_PUBLIC_KEY,
  PAYSTACK_PRIVATE_KEY,
  PAYSTACK_API_URL,

  //   CLIENT_ORIGIN,
  //   REDIS_HOST,
  //   REDIS_PORT,
  //   REDIS_PASSWORD,
  //   REDIS_SESSION_PREFIX,
  //   REDIS_SESSION_EXPIRATION_TIME,
  //   REDIS_CLUSTER_NODES,
  //   REDIS_CLUSTER_OPTIONS,
  //   REDIS_CLUSTER_READ_PREFERENCE,
  //   REDIS_CLUSTER_MAX_RETRY_ATTEMPTS,
  //   REDIS_CLUSTER_RETRY_DELAY,
  //   REDIS_CLUSTER_RETRY_JITTER,
  //   REDIS_CLUSTER_MAX_RETRY_DELAY,
  //   REDIS_CLUSTER_MIN_RETRY_DELAY,
  //   REDIS_CLUSTER_MAX_CONNECTIONS,
  //   REDIS_CLUSTER_MAX_WRITE_BUFFER_SIZE,
  //   REDIS_CLUSTER_CONNECT_TIMEOUT,
  //   REDIS_CLUSTER_RETRY_ON_CONNECTION_FAILURE,
} = process.env;
