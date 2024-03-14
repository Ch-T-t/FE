import instanceAxios from '@/api/instanceAxios';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt', // <-- make sure to use jwt here
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // if (account?.provider === 'google') {
      //   const googleAuthData = {
      //     name: user.name,
      //     email: user.email,
      //     image: user.image,
      //     authProvider: 'google',
      //     test: account.access_token,
      //     password: '',
      //   };
      //   try {
      //     const loginResponse = await instanceAxios.post(`/api/token/`, {
      //       name: googleAuthData.name,
      //       email: googleAuthData.email,
      //       secretKey: 'xxx',
      //     });
      //     if (loginResponse.data) return true;
      //   } catch (error) {
      //     console.log('errrrrrrrrrrrrrrrrrrr');
      //   }
      // }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
