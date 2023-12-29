import type { SessionOptions } from "iron-session";

import { env } from "~/env";

export interface SessionData {
  sessionToken: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  sessionToken: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: env.NEXT_PUBLIC_SESSION_SECRET,
  cookieName: "pogi-boys",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
