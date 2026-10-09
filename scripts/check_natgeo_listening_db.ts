export {};
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const byExternalId = await prisma.listeningLesson.findMany({
    where: {
      OR: [
        { id: { contains: "environmental" } },
        { id: { contains: "natgeo" } },
        { audioUrl: { contains: "1kUE0BZtTRc" } },
        { title: { contains: "Renewable" } },
      ],
    },
  });
  console.log("Matching ListeningLesson rows:", byExternalId.map(l => ({ id: l.id, title: l.title, audioUrl: l.audioUrl })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
