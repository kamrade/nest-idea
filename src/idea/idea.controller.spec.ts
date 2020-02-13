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

  it('showAllIdeas: should return all ideas', async () => {
    const expectedResult = new IdeaEntity();
    expectedResult.idea = 'idea';
    expectedResult.description = 'description';
    jest.spyOn(ideaService, "showAll").mockResolvedValue([expectedResult]);
    expect(await controller.showAllIdeas()).toStrictEqual([expectedResult]);
  });

  it('createIdea: should create idea and get correct respond if data is correct', async () => {
    const ideaData: IdeaDTO = {
      idea: 'idea to create',
      description: 'description of created idea'
    }
    const expectedResult = new IdeaEntity();
    expectedResult.idea = ideaData.idea;
    expectedResult.description = ideaData.description;

    jest.spyOn(ideaService, "create").mockResolvedValue(expectedResult);
    expect(await controller.createIdea(ideaData)).toBe(expectedResult);
  });

  it('readIdea: should read the idea with id', async () => {
    const searchId = '10001';
    const expectedResult = new IdeaEntity();
    expectedResult.idea = 'read idea';
    expectedResult.description = 'read description';

    jest.spyOn(ideaService, "read").mockResolvedValue(expectedResult);
    expect(await controller.readIdea(searchId)).toBe(expectedResult);
  });

  it('updateIdea: should edit the idea', async () => {
    const editedIdeaId = '10002';
    const ideaEditedData: IdeaDTO = {
      idea: 'edited idea',
      description: 'edited description'
    }
    const expectedResult = new IdeaEntity();
    expectedResult.idea = 'initial idea';
    expectedResult.description = 'initial description';
    
    jest.spyOn(ideaService, "update").mockImplementation((id: string, data: IdeaDTO) => {
      expectedResult.id = id;
      expectedResult.idea = data.idea;
      expectedResult.description = data.description;
      return Promise.resolve(expectedResult);
    });

    const updateResult = await controller.updateIdea(editedIdeaId, ideaEditedData);
    expect(updateResult).toHaveProperty('idea', ideaEditedData.idea);
    expect(updateResult).toHaveProperty('description', ideaEditedData.description);
    expect(updateResult).toHaveProperty('id', editedIdeaId);
  
  });

  it('destroyIdea: should delete idea by id and return it', async () => {
    const ideaToDestroyId = '10002';
    const expectedResult = new IdeaEntity();
    expectedResult.idea = 'idea to delete';
    expectedResult.description = 'description to delete';
    expectedResult.id = ideaToDestroyId;

    jest.spyOn(ideaService, 'destroy').mockResolvedValue(expectedResult);
    const deleteResult = await controller.destroyIdea(ideaToDestroyId);
    expect(deleteResult).toBe(expectedResult);
  });


  afterEach(() => {
    jest.resetAllMocks();
  })
});
