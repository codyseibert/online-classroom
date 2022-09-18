-- CreateTable
CREATE TABLE "_EnrolledIn" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EnrolledIn_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EnrolledIn_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_EnrolledIn_AB_unique" ON "_EnrolledIn"("A", "B");

-- CreateIndex
CREATE INDEX "_EnrolledIn_B_index" ON "_EnrolledIn"("B");
