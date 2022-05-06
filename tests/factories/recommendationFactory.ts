import { prisma } from "../../src/database.js";
import { Recommendation } from "@prisma/client";
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

export const recommendationFactory: CreateRecommendationData = {
  name: 'Sasuke vs Naruto', 
  youtubeLink: 'https://www.youtube.com/watch?v=hgxQ5k1OmrY'
};

export const recommendationIntegrationFactory: CreateRecommendationData = {
  name: 'Saitama vs Garou', 
  youtubeLink: 'https://www.youtube.com/watch?v=QK278Iah5yc'
}

export async function findRecommendationDatabaseSeed(id: number): Promise<Recommendation> {
  return await prisma.recommendation.findUnique({ where: { id } })
}