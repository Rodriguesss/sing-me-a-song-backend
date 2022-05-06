import { e2eRepository } from "../repositories/e2eRepository";

async function resetDatabase() {
  return await e2eRepository.resetDatabase();
}

export const e2eService = {
  resetDatabase,
}