-- Moves the Auth.js (next-auth) tables to Better Auth's schema in place,
-- keeping every user's id, so their characters stay theirs, and every Google
-- account link, so signing in with Google again finds the same user.

-- User: Better Auth requires a name, and keeps emailVerified as a boolean.
-- An empty name is what Better Auth stores itself for a Google profile with
-- none, and what useAuth already shows as 'Unknown'.
UPDATE "User" SET "name" = '' WHERE "name" IS NULL;

ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

ALTER TABLE "User" ALTER COLUMN "emailVerified" TYPE BOOLEAN USING ("emailVerified" IS NOT NULL),
ALTER COLUMN "emailVerified" SET DEFAULT false,
ALTER COLUMN "emailVerified" SET NOT NULL;

-- Account: same rows, renamed to Better Auth's fields, with an id of their own.
-- The old primary key stays until the new one replaces it: a database that
-- publishes changes (Prisma Postgres does) refuses to update a table without
-- one.
ALTER TABLE "Account" RENAME COLUMN "provider" TO "providerId";
ALTER TABLE "Account" RENAME COLUMN "providerAccountId" TO "accountId";
ALTER TABLE "Account" RENAME COLUMN "access_token" TO "accessToken";
ALTER TABLE "Account" RENAME COLUMN "refresh_token" TO "refreshToken";
ALTER TABLE "Account" RENAME COLUMN "id_token" TO "idToken";

ALTER TABLE "Account" ADD COLUMN "id" TEXT,
ADD COLUMN "accessTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN "refreshTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN "password" TEXT;

-- expires_at is Unix seconds; timestamps here are UTC, whatever the
-- connection's time zone. Auth.js kept the token response's scope as given,
-- space-separated; Better Auth keeps scopes comma-separated.
UPDATE "Account" SET
  "id" = gen_random_uuid()::text,
  "accessTokenExpiresAt" = to_timestamp("expires_at") AT TIME ZONE 'UTC',
  "scope" = NULLIF(array_to_string(regexp_split_to_array(btrim("scope"), '[\s,]+'), ','), '');

ALTER TABLE "Account" ALTER COLUMN "id" SET NOT NULL,
DROP CONSTRAINT "Account_pkey",
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

ALTER TABLE "Account" DROP COLUMN "type",
DROP COLUMN "expires_at",
DROP COLUMN "token_type",
DROP COLUMN "session_state";

-- The old primary key, (provider, providerAccountId), kept one row per
-- Google account; Better Auth refuses a sign-in that matches two.
CREATE UNIQUE INDEX "Account_providerId_accountId_key" ON "Account"("providerId", "accountId");

CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- Session: the app signed in with JWTs, so no row here was in use, and
-- Better Auth can't read Auth.js's sessions anyway. Everyone signs in again.
DROP TABLE "Session";

CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

CREATE INDEX "Session_userId_idx" ON "Session"("userId");

ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Verification: Auth.js only wrote email sign-in tokens here, which the app
-- never offered, and only as hashes Better Auth can't check.
DROP TABLE "VerificationToken";

CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Verification_identifier_idx" ON "Verification"("identifier");
