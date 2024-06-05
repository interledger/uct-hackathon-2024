-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "about" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "imageUrl" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_instagram_key" ON "User"("instagram");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitter_key" ON "User"("twitter");

-- CreateIndex
CREATE UNIQUE INDEX "User_linkedin_key" ON "User"("linkedin");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
