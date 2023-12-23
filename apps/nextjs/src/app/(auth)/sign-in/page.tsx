import { cookies } from "next/headers";

import { api } from "~/trpc/server";
import LoginForm from "./form";

export default function LoginPage() {
  async function performLogin(values: {
    email: string;
    password: string;
  }): Promise<void> {
    "use server";

    const response = await api.auth.login.mutate(values);
    cookies().set("sessionToken", response.sessionToken);
  }

  return <LoginForm performLogin={performLogin} />;
}
