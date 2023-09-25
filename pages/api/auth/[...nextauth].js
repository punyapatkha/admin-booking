import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt from "jsonwebtoken";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      
      async authorize(credentials, req) {
        if(credentials.password=="123"){
          
          var JWT_SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
          let token_data ={"sub": "123"}
          let expires_delta=99999
          const token = jwt.sign(token_data, JWT_SECRET_KEY);
          let data = {
            "status": "ok",
            "message": "Logged in",
            "accessToken": token,
            "token_type": token,
            "expiresIn": 5999940,
            "user": {
              "id": 1,
              "fname": "123",
              "access_token": token,
              "username": "123",
              "email": "123",
              "avatar": "https://www.melivecode.com/users/1.png"
            }
          }
          
          return data.user
        }
        else{
          // Return null if user data could not be retrieved
          return null
        }
        
      }
    }),

  ],
  callbacks: {
    async jwt({ token,user, account }) {
      
      // console.log("1")
      // console.log(token)
      
      // console.log("2")
      
      // console.log(user)
      // console.log("3")
      // console.log(account)

      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.user = user
      }
      return token
    },
    async session({ session,user, token  }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user = token.user
      // session.user2 = token.user
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)

