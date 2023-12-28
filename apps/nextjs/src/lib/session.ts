import type { SessionOptions } from "iron-session";

export interface SessionData {
  sessionToken: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  sessionToken: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "pogi-boys",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
