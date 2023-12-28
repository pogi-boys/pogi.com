import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import type { SessionData } from "~/lib/session";
import { defaultSession, sessionOptions } from "~/lib/session";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.sessionToken = defaultSession.sessionToken;
  }

  return session;
}

export async function logout() {
  "use server";

  const session = await getSession();
  session.destroy();
}
