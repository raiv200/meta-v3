import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const authOptions = {
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        return await signInWithEmailAndPassword(
          auth,
          credentials.email || "",
          credentials.password || ""
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            } else {
              return null;
            }
          })
          .catch((error) => {
            if (error) {
              const errorCode = error.code;
              const errorMessage = error.message;
              // console.log("Is this  the error ", error);
              redirect("/error");
            }
          });
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          userid: token.id,
          name: token.user,
          email: token.email,
        },
      };
    },
    jwt: ({ token, user, account, profile, isNewUser }) => {
      if (user) {
        const u = user;
        return {
          ...token,
          id: u.uid,
          user: u.displayName,
        };
      }
      return token;
    },
    signin: ({ user, account, profile, email, credentials }) => {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
// };
