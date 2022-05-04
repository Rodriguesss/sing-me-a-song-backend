import { prisma } from "../../src/database.js";
import { Recommendation } from "@prisma/client";
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

export const recommendationFactory: CreateRecommendationData = {
  name: 'Madara vs Guy', youtubeLink: 'https://www.youtube.com/watch?v=AGal_dWoAfc'
};

export async function findRecommendationDatabaseSeed(id: number): Promise<Recommendation> {
  return await prisma.recommendation.findUnique({ where: { id } })
}