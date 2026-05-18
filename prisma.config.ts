import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: process.env.DATABASE_URL="postgresql://neondb_owner:npg_JiEFW6P5Qxet@ep-winter-leaf-aq3zs49z.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
});