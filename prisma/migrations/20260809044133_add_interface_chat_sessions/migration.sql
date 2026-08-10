-- CreateTable
CREATE TABLE "interface_chat_sessions" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interface_chat_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interface_chat_messages" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interface_chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "interface_chat_messages_sessionId_idx" ON "interface_chat_messages"("sessionId");

-- AddForeignKey
ALTER TABLE "interface_chat_messages" ADD CONSTRAINT "interface_chat_messages_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "interface_chat_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
