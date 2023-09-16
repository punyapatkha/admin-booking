import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

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
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // var datatata = {
        //   'username': '123',
        //   'password': '321'
        // }
        
        // const todoObject = {
        //   username: 123,
        //   password: '321'
        // };
        // const res = await fetch("http://127.0.0.1:8000/token", {
          // process.env.API_URL

          // แก้ตรงนี้เอา fetch API ออกเก็บไว้ใช้หลังจากยอมเสียเงินแล้ว ใช้ fix code ไปก่อนจะได้ไวๆ
        const res = await fetch(
          // process.env.NEXT_PUBLIC_API_URL+"token"
          "https://fastapi-booking.vercel.app/token"
          // "http://localhost:8000/token"
          , {
          method: 'POST',
          // body: datatata,
          // body: JSON.stringify(credentials),
          // body: datatata,
          body: JSON.stringify(credentials),
          // headers: { "Content-Type": "application/x-www-form-urlencoded" }  
          headers: { "Content-Type": "application/json" }
           
        })
        const data = await res.json()
        if (data.status == 'ok'){
          return data.user
        }
        // Return null if user data could not be retrieved
        return null
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

