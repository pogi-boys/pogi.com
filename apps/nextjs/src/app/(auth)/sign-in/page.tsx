import { getSession } from "~/app/actions";
import { api } from "~/trpc/server";
import LoginForm from "./form";

export default function LoginPage() {
  async function performLogin(values: {
    email: string;
    password: string;
  }): Promise<void> {
    "use server";
    const session = await getSession();
    const response = await api.auth.login.mutate(values);

    session.sessionToken = response.sessionToken;
    session.isLoggedIn = true;

    await session.save();
  }

  return <LoginForm performLogin={performLogin} />;
}
