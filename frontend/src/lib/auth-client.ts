import { createAuthClient } from "better-auth/react";
export const { signIn, signOut, useSession } = createAuthClient({
  fetchOptions: { credentials: "include" },
});
