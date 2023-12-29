import { redirect } from "next/navigation";

import { getSession } from "~/app/actions";
import LoginForm from "./form";

export default async function LoginPage() {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
