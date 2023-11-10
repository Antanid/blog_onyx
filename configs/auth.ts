import type { AuthOptions } from "next-auth";

import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "./mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authConfig: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.email === 'dbalakleenko1@gmail.com' || profile.email === 'gbyudbyxbr000@gmail.com' ? 'admin' : 'user',
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.email === 'dbalakleenko1@gmail.com' ? 'admin' : 'user'
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { email, password, role } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }
          return {name: user.name, email: user.email, role: user.role} as any;
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
}
