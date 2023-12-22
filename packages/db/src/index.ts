import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

export const schema = {};

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const connection = connect({
  host: process.env.DB_HOST!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
});

export const db = drizzle(connection, { schema });
