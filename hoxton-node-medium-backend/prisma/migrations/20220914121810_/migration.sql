/*
  Warnings:

  - You are about to drop the column `howmany` on the `Likes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Likes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Likes" ("id", "postId") SELECT "id", "postId" FROM "Likes";
DROP TABLE "Likes";
ALTER TABLE "new_Likes" RENAME TO "Likes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
