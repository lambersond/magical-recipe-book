-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "baneChanges" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "boonChanges" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "CookedDish" ADD COLUMN     "sentAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CharacterSettings" ADD COLUMN     "sendingStoneLinkedAt" TIMESTAMP(3),
ADD COLUMN     "sendingStoneToken" TEXT;

