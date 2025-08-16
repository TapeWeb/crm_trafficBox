import dotenv from "dotenv";
dotenv.config();

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
  // Server & Client
  SERVER_PORT: Number(getEnvVar("SERVER_PORT", "3000")),
  CLIENT_PORT: Number(getEnvVar("CLIENT_PORT", "5173")),

  // Docker / Environment
  NODE_ENV: getEnvVar("DOCKER_MODE", "development"),
  COMPOSE_FILE: getEnvVar("COMPOSE_FILE"),

  // MySQL
  MYSQL_HOST: getEnvVar("MYSQL_HOST", "app_mysql"),
  MYSQL_PORT: Number(getEnvVar("MYSQL_PORT", "3306")),
  MYSQL_USER: getEnvVar("MYSQL_USER"),
  MYSQL_PASSWORD: getEnvVar("MYSQL_PASSWORD"),
  MYSQL_ROOT_PASSWORD: getEnvVar("MYSQL_ROOT_PASSWORD"),
  MYSQL_DATABASE: getEnvVar("MYSQL_DATABASE"),

  // Prisma Database URL
  DATABASE_URL: getEnvVar(
    "DATABASE_URL",
    `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`
  ),

  // PHPMyAdmin
  PMA_INTERNAL_PORT: Number(getEnvVar("PMA_INTERNAL_PORT", "80")),
  PMA_EXTERNAL_PORT: Number(getEnvVar("PMA_EXTERNAL_PORT", "8080")),
};
