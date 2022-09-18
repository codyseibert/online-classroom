import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    create: {
      id: 'al814zcy80074hloomogrg1mv',
      name: 'Teacher Rick',
      role: 'teacher',
      email: 'teacherrick@example.com',
    },
    update: {},
    where: { email: 'teacherrick@example.com' },
  });

  await prisma.user.upsert({
    create: {
      id: 'bl814zcy80074hloomogrg1mv',
      name: 'Student Bob',
      role: 'student',
      email: 'studentbob@example.com',
    },
    update: {},
    where: { email: 'studentbob@example.com' },
  });
}

main();
