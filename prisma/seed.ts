import { prisma } from "../src/database.js";

async function main() {
  await prisma.recommendation.createMany({
    data: [
      { name: 'Naruto vs Pain', youtubeLink: 'https://www.youtube.com/watch?v=clFC_ZitYdo&t=120s' },
      { name: 'Uzui vs Gyutaro', youtubeLink: 'https://www.youtube.com/watch?v=bhm179EOzzo' },
      { name: 'Jujutsu Kaisen 0 | Trailer Dublado', youtubeLink: 'https://www.youtube.com/watch?v=aTpSx7ERT7w' }
    ]
  })
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });