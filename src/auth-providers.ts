import type { BetterAuthOptions } from 'better-auth'

type SocialProviders = NonNullable<BetterAuthOptions['socialProviders']>

/** Sign-in providers, each switched on by its AUTH_*_ENABLED variable. */
export const socialProviders = () =>
  ({
    google: {
      enabled: isTrue(process.env.AUTH_GOOGLE_ENABLED),
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    },
  }) satisfies SocialProviders

const isTrue = (value?: string) => value?.toLowerCase() === 'true'
