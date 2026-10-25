-- AlterTable
ALTER TABLE "CharacterSettings" ADD COLUMN     "mode" TEXT NOT NULL DEFAULT 'companion',
ADD COLUMN     "sendToFoundry" BOOLEAN NOT NULL DEFAULT false;

-- Characters already linked to Sending Stone keep sending their dishes
UPDATE "CharacterSettings" SET "sendToFoundry" = true WHERE "sendingStoneToken" IS NOT NULL;
