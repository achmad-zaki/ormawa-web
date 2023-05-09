import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export default NextAuth({
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
          return user;
        } else {
          throw new Error("Incorrect password");
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.uid;
      return session;
    },
  },
  database: process.env.DATABASE_URL,
});

