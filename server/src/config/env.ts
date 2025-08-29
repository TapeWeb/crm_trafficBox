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

  // PostgreSQL
  POSTGRES_HOST: getEnvVar("POSTGRES_HOST", "app_postgresql"),
  POSTGRES_PORT: Number(getEnvVar("POSTGRES_PORT", "5432")),
  POSTGRES_USER: getEnvVar("POSTGRES_USER"),
  POSTGRES_PASSWORD: getEnvVar("POSTGRES_PASSWORD"),
  POSTGRES_ROOT_PASSWORD: getEnvVar("POSTGRES_ROOT_PASSWORD"),
  POSTGRES_DB: getEnvVar("POSTGRES_DB"),

  // Prisma / Database URL
  DATABASE_URL: getEnvVar(
    "DATABASE_URL",
    `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}` +
    `@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?schema=public`
  ),

  // pgAdmin
  PGADMIN_EMAIL: getEnvVar("PGADMIN_EMAIL", "admin@admin.com"),
  PGADMIN_PASSWORD: getEnvVar("PGADMIN_PASSWORD", "admin"),
  PGADMIN_PORT: Number(getEnvVar("PGADMIN_PORT", "5050")),
};
