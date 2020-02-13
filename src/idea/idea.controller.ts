import { IdeaDTO } from './idea.dto';
import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger } from '@nestjs/common';
import { IdeaService } from './idea/idea.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { IdeaEntity } from './idea.entity';

@Controller('api/ideas')
export class IdeaController {

  private logger = new Logger('IdeaController');
  
  constructor(private ideaService: IdeaService) {}

  @Get()
  showAllIdeas(): Promise<IdeaEntity[]> {
    return this.ideaService.showAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createIdea(@Body() data: IdeaDTO): Promise<IdeaEntity> {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.create(data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateIdea(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.update(id, data);
  }

  @Delete(':id')
  destroyIdea(@Param('id') id: string) {
    return this.ideaService.destroy(id);
  }

}
