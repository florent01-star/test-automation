import 'dotenv/config';

export function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Variable d'environnement manquante : ${name}`);
  return value;
}

export const USER = {
  email: env('USER_EMAIL'),
  password: env('USER_PASSWORD'),
};

export const USER2 = {
  email: env('USER2_EMAIL'),
  password: env('USER2_PASSWORD'),
};