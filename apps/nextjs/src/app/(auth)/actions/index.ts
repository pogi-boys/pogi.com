"use server";

import { getSession } from "~/app/actions";
import { api } from "~/trpc/server";

export const handleLogin = async (values: {
  email: string;
  password: string;
}): Promise<void> => {
  const { sessionToken } = await api.auth.login.mutate(values);

  const session = await getSession();
  session.sessionToken = sessionToken;
  session.isLoggedIn = true;

  await session.save();
};
