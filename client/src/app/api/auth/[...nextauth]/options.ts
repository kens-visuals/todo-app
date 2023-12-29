import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/app/lib/mongodb';

export const options = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log('profile', profile);

        return {
          ...profile,
          id: profile.sub,
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  callbacks: {
    async session(session) {
      return session;
    },
    // async jwt(token, user) {
    //   if (user) {
    //     token.role = user.role;
    //   }

    //   return token;
    // },
  },
};
