import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { socialProviders } from './auth-providers'
import prisma from './clients/prisma'

// The app's address is BETTER_AUTH_URL, or the request's host when unset.
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  // Also the secret names next-auth read, so an existing deployment keeps working
  secret:
    process.env.BETTER_AUTH_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET,
  socialProviders: socialProviders(),
  session: {
    expiresIn: Number(process.env.AUTH_MAX_AGE) || 30 * 86_400, // 30 days
    updateAge: 86_400,
  },
  rateLimit: {
    // Starting a Google sign-in only hands back Google's URL, so let a table
    // of players on one network sign in together (the default allows 3)
    customRules: { '/sign-in/social': { window: 10, max: 10 } },
  },
  // nextCookies must stay the last plugin
  plugins: [nextCookies()],
})
