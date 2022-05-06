import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService, CreateRecommendationData } from "../../src/services/recommendationsService";
import { jest } from "@jest/globals";
import { recommendationFactory } from "../factories/recommendationFactory";

describe("create recommendation", () => {
  it("should create a recommendation", async () => {
    const responseCreate = jest
      .spyOn(recommendationRepository, "create")
      .mockResolvedValue(null);

    await recommendationService.insert({ ...recommendationFactory, name: 'Test' });

    expect(responseCreate).toHaveBeenCalled();
  });
});

describe("upvote", () => {
  it("should return the summed counter", async () => {
    const responseUpdate = spyFindAndUpdateScore(recommendationFactory);
    await recommendationService.upvote(1);
    expect(responseUpdate).toHaveBeenCalled();
  });

  it("should return not found error", async () => {
    spyFindWithNull();

    expect(async () => await recommendationService.upvote(1))
      .rejects
      .toHaveProperty('type', 'not_found');
  });
});

describe("downvote", () => {
  it("should return the subtracted counter", async () => {
    const responseUpdate = spyFindAndUpdateScore(recommendationFactory);
    await recommendationService.downvote(1);
    expect(responseUpdate).toHaveBeenCalled();
  });

  it("should return not found error", async () => {
    spyFindWithNull();

    expect(async () => await recommendationService.downvote(1))
      .rejects
      .toHaveProperty('type', 'not_found');
  });

  it("should remove a recommendation", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValue(
        {
          ...recommendationFactory,
          id: 1,
          score: -6
        })

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValue(null);

    const responseRemove = jest.
      spyOn(recommendationRepository, "remove")
      .mockResolvedValue(null);

    await recommendationService.downvote(1);

    expect(responseRemove).toHaveBeenCalled();
  });
});

describe("getById", () => {
  it("should return a recommendation", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValue({
        ...recommendationFactory,
        id: 1,
        score: 0
      })

    const resolve = async () => await recommendationService.getById(1);

    expect(resolve)
      .not
      .toBeNull();
  });
});

describe("get", () => {
  it("should return two recommendations", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue([{
        ...recommendationFactory,
        id: 1,
        score: 0
      }, {
        ...recommendationFactory,
        name: 'Teste 2',
        id: 2,
        score: 0
      }]);

    const resolve = await recommendationService.get();

    expect(resolve.length)
      .toEqual(2)
  });
})

describe("get top", () => {
  it("should return two recommendations", async () => {
    const recommendations = jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockResolvedValue([{
        ...recommendationFactory,
        id: 1,
        score: 30
      }, {
        ...recommendationFactory,
        name: 'Teste 2',
        id: 2,
        score: 1
      }]);

    const resolve = await recommendationService.getTop(2);

    expect(recommendations)
      .toHaveBeenCalled();

    expect(resolve.length)
      .toEqual(2);

    expect(resolve[0].score > resolve[1].score)
      .toEqual(true);
  });
});

describe("get random", () => {
  it("sdfsdf", async () => {
    jest
      .spyOn(recommendationService, "getScoreFilter")
      .mockReturnValue("gt");

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue([]);

    jest
      .spyOn(recommendationService, "getByScore")
      .mockResolvedValue([]);

    expect(async () => await recommendationService.getRandom())
      .rejects
      .toHaveProperty('type', 'not_found');
  });

  it("sdfsdfasd", async () => {
    jest
      .spyOn(recommendationService, "getScoreFilter")
      .mockReturnValue("lte");

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue([{
        ...recommendationFactory,
        id: 1,
        score: 30
      }, {
        ...recommendationFactory,
        name: 'Teste 2',
        id: 2,
        score: 1
      }]);

    jest
      .spyOn(recommendationService, "getByScore")
      .mockResolvedValue([{
        ...recommendationFactory,
        id: 1,
        score: 30
      }, {
        ...recommendationFactory,
        name: 'Teste 2',
        id: 2,
        score: 1
      }]);

    const resolve = await recommendationService.getRandom();

    expect(typeof resolve)
      .toBe("object")
  });

});

function spyFindAndUpdateScore(factoryObject: CreateRecommendationData) {
  jest
    .spyOn(recommendationRepository, "find")
    .mockResolvedValue(
      {
        ...factoryObject,
        id: 1,
        score: 0,
      });

  const responseUpdate = jest
    .spyOn(recommendationRepository, "updateScore")
    .mockResolvedValue(null);

  return responseUpdate;
}

function spyFindWithNull() {
  jest
    .spyOn(recommendationRepository, "find")
    .mockResolvedValue(null);

  return null;
}