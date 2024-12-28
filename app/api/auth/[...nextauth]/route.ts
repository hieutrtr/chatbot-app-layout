import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // After initial sign in, call your backend
        try {
            console.log("token", token);
            console.log("user", user);
            console.log("account", account);
        //   const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       googleToken: account.id_token,
        //       // Add any other necessary data
        //     }),
        //   });
          
        //   const backendData = await response.json();
          
        // //   Store backend JWT and any other data in the token
        //   token.backendToken = backendData.jwt;
        //   token.backendUserData = backendData.userData; // If your backend sends additional user data
        } catch (error) {
          console.error('Backend authentication failed:', error);
        }
      }
      return token;
    },
    
    async session({ session, token }) {
      // Pass backend data to the client-side session
      console.log("session", session);
      console.log("token", token);
      return {
        ...session,
        backendToken: token.backendToken,
        backendUserData: token.backendUserData,
      };
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST }; 