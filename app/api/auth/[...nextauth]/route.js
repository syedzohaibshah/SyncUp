import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@model/user';

const databaseName = 'SyncUp';

let isConnected = false;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (!isConnected) {
        await connectToDB(databaseName);
        isConnected = true;
      }

      if (token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        if (!isConnected) {
          await connectToDB(databaseName);
          isConnected = true;
        }

        const dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          const newUser = await User.create({
            email: user.email,
            username: user.name.replace(/ /g, "").toLowerCase(),
            image: user.image
          });
          token.sub = newUser._id.toString();
        } else {
          token.sub = dbUser._id.toString();
        }
      }
      return token;
    }
  }
});

export { handler as GET, handler as POST };