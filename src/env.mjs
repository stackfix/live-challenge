import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    USE_API_DATA: z.enum(["true", "false"]),
    DATABASE_URL: z.string().url(),
  },
  client: {
    // Add client-side env vars here if needed
  },
  runtimeEnv: {
    USE_API_DATA: process.env.USE_API_DATA,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
