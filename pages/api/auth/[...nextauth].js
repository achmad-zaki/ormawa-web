import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/config/db";



export default NextAuth({
  secret: process.env.jWT_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
          throw new Error("Username not found");
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (isCorrectPassword) {
          // req.session.set('user', { id: user.id });
          // await req.session.save();
          return user;

        } else {
          throw new Error("Incorrect password");
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },

  database: process.env.DATABASE_URL,
});

