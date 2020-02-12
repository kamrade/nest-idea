import { Test, TestingModule } from '@nestjs/testing';

import { IdeaController } from './idea.controller';
import { IdeaService } from './idea/idea.service';
import { IdeaDTO } from './idea.dto';
import { IdeaEntity } from './idea.entity';
jest.mock('./idea/idea.service');

describe('Idea Controller', () => {

  // global variables for it
  let ideaService: IdeaService;
  let controller: IdeaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeaController],
      providers: [IdeaService]
    }).compile();

    ideaService = module.get<IdeaService>(IdeaService);
    controller = module.get<IdeaController>(IdeaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call ideasService.showAll in showAllIdeas function and return correct value', async () => {
    const expectedResult = [new IdeaEntity()];
    expectedResult[0].idea = 'idea';
    expectedResult[0].description = 'description';
    jest.spyOn(ideaService, "showAll").mockResolvedValue(expectedResult);
    expect(await controller.showAllIdeas()).toBe(expectedResult);
  });

  afterEach(() => {
    jest.resetAllMocks();
  })
});
