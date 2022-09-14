/*
  Warnings:

  - You are about to drop the column `howmany` on the `Comments` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("id", "postId", "text") SELECT "id", "postId", "text" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
