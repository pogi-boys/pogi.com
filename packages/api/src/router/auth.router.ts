import { TRPCError } from "@trpc/server";
import * as argon from "argon2";
import * as jwt from "jsonwebtoken";
import * as z from "zod";

import { eq, schema } from "@pogi/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

// Creates a JWT that expires in 12 hours
const generateJWT = (email: string, id: string) =>
  jwt.sign({ data: { email, id } }, process.env.JWT_SECRET!, {
    expiresIn: 60 * 720,
  });

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

      const passwordsMatch = await argon.verify(user.password, input.password);
      if (!passwordsMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect email or password.",
        });
      }

      // generate JWT
      const token = generateJWT(user.email, user.id);

      return { sessionToken: token };
    }),
});
