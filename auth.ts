import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "@/lib/db/schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const providers: any[] = [
  Resend({
    from: "Kawaf GTM <onboarding@resend.dev>",
  }),
];

// Test credentials login — only enabled when TEST_USER_EMAIL is set
if (process.env.TEST_USER_EMAIL) {
  providers.push(
    Credentials({
      name: "Test Account",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (
          email !== process.env.TEST_USER_EMAIL ||
          password !== process.env.TEST_USER_PASSWORD
        ) {
          return null;
        }

        // Find or create test user
        const [existing] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (existing) {
          return { id: existing.id, email: existing.email, name: existing.name };
        }

        const [created] = await db
          .insert(users)
          .values({ email, name: "Test User" })
          .returning();

        return { id: created.id, email: created.email, name: created.name };
      },
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "jwt" },
  providers,
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verify=true",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
