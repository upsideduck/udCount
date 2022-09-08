import lucia from "lucia-sveltekit";
import prisma from "@lucia-sveltekit/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";

const client = new PrismaClient();

export const auth = lucia({
  adapter: prisma(client),
  secret: process.env.LUCIA_SECRET_KEY,
  env: dev ? "DEV" : "PROD",
});
