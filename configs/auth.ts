import type { AuthOptions, User } from "next-auth";

import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from "next-auth/providers/github";
import Credentials from 'next-auth/providers/credentials'
import { users } from "@/data/users";

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
                role: profile.email === 'dbalakleenko1@gmail.com' || profile.email === 'gbyudbyxbr000@gmail.com'  ? 'admin' : 'user',
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
                // role: profile.email === 'dbalakleenko1@gmail.com' ? 'admin' : 'user',
                role: 'user',
              };
            },
          }),
          Credentials({
            credentials: {
              email: { label: 'email', type: 'email', required: true },
              password: { label: 'password', type: 'password', required: true },
            },
            async authorize(credentials) {
              if (!credentials?.email || !credentials.password) return null;
      
              const currentUser = users.find(user => user.email === credentials.email)
      
              if (currentUser && currentUser.password === credentials.password) {
                const { password, ...userWithoutPass } = currentUser;
      
                return userWithoutPass as User;
              }
      
              return null
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
}
