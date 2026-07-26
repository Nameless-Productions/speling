/*
  Warnings:

  - Added the required column `post` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "post" INTEGER NOT NULL,
    "authorID" INTEGER NOT NULL,
    "content" TEXT NOT NULL
);
INSERT INTO "new_Comment" ("authorID", "content", "id") SELECT "authorID", "content", "id" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
