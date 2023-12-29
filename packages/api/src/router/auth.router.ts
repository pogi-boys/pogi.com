import { TRPCError } from "@trpc/server";
import * as bcrypt from "bcryptjs";
import * as jose from "jose";
import * as z from "zod";

import { eq, schema } from "@pogi/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const createToken = async (userId: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ userId, exp: 100 })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(Math.floor(new Date().getTime() / 1000) + 12 * 60 * 60)
    .sign(secret);
  return token;
};

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const user = await db.query.users.findFirst({
        where: eq(schema.users.email, input.email),
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect email or password.",
        });
      }

      const passwordsMatch = await bcrypt.compare(
        input.password,
        user.password,
      );
      if (!passwordsMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect email or password.",
        });
      }

      const token = await createToken(user.id);

      return { sessionToken: token };
    }),
});
