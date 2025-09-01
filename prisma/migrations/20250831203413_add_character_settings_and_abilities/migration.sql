-- CreateTable
CREATE TABLE "CharacterSettings" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterAbilities" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "cookingAbility" INTEGER NOT NULL DEFAULT 0,
    "proficiency" INTEGER NOT NULL DEFAULT 2,
    "hasCookingTools" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterAbilities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterSettings_characterId_key" ON "CharacterSettings"("characterId");

-- CreateIndex
CREATE INDEX "CharacterSettings_characterId_idx" ON "CharacterSettings"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterAbilities_characterId_key" ON "CharacterAbilities"("characterId");

-- CreateIndex
CREATE INDEX "CharacterAbilities_characterId_idx" ON "CharacterAbilities"("characterId");

-- AddForeignKey
ALTER TABLE "CharacterSettings" ADD CONSTRAINT "CharacterSettings_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAbilities" ADD CONSTRAINT "CharacterAbilities_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Populate settings for existing characters
INSERT INTO "CharacterSettings" ("id", "characterId", "campaignId", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(), 
    "id", 
    '',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
FROM "Character"
WHERE "id" NOT IN (SELECT "characterId" FROM "CharacterSettings");

-- Populate abilities for existing characters
INSERT INTO "CharacterAbilities" ("id", "characterId", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(), 
    "id", 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP  
FROM "Character"
WHERE "id" NOT IN (SELECT "characterId" FROM "CharacterAbilities");