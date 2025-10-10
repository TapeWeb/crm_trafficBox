const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
};

export const ENV = {
  // PostgresSQL
  POSTGRES_HOST: getEnvVar("POSTGRES_HOST"),
  POSTGRES_PORT: getEnvVar("POSTGRES_PORT"),
  POSTGRES_USER: getEnvVar("POSTGRES_USER"),
  POSTGRES_PASSWORD: getEnvVar("POSTGRES_PASSWORD"),
  POSTGRES_DB: getEnvVar("POSTGRES_DB"),
  DATABASE_URL: getEnvVar("DATABASE_URL"),

  // PGAdmin
  PGADMIN_EMAIL: getEnvVar("PGADMIN_EMAIL"),
  PGADMIN_PASSWORD: getEnvVar("PGADMIN_PASSWORD"),
  PGADMIN_PORT: getEnvVar("PGADMIN_PORT"),

  // Server
  VITE_SERVER_PORT: getEnvVar("VITE_SERVER_PORT"),
  VITE_SERVER_API_URL: getEnvVar("VITE_SERVER_API_URL"),

  // Client
  VITE_CLIENT_PORT: getEnvVar("VITE_CLIENT_PORT"),
  VITE_CLIENT_API_URL: getEnvVar("VITE_CLIENT_API_URL"),

  // Docker
  DOCKER_MODE: getEnvVar("DOCKER_MODE"),
  COMPOSE_FILE: getEnvVar("COMPOSE_FILE"),

  CONTAINER_NAME_POSTGRESQL: getEnvVar("CONTAINER_NAME_POSTGRESQL"),
  CONTAINER_NAME_PGADMIN: getEnvVar("CONTAINER_NAME_PGADMIN"),
  CONTAINER_NAME_SERVER: getEnvVar("CONTAINER_NAME_SERVER"),
  CONTAINER_NAME_CLIENT: getEnvVar("CONTAINER_NAME_CLIENT"),

  NETWORK_NAME: getEnvVar("NETWORK_NAME"),
};
