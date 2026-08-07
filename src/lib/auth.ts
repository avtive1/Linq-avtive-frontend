import { createAuthClient } from "@neondatabase/auth";
import { BetterAuthReactAdapter } from "@neondatabase/auth/react/adapters";

export const auth = createAuthClient(
  process.env.NEXT_PUBLIC_NEON_AUTH_URL!,
  {
    adapter: BetterAuthReactAdapter(),
  }
);