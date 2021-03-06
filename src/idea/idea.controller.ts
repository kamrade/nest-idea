import { IdeaDTO, IdeaRO } from './idea.dto';
import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger, UseGuards } from '@nestjs/common';
import { IdeaService } from './idea/idea.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../user/user.decorator';

@Controller('api/ideas')
export class IdeaController {

  private logger = new Logger('IdeaController');
  
  constructor(private ideaService: IdeaService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
    options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
  }

  @Get()
  showAllIdeas(): Promise<IdeaRO[]>{
    return this.ideaService.showAll();
  }

  @Get(':id')
  readIdea(@Param('id') id: string): Promise<IdeaRO> {
    return this.ideaService.read(id);
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createIdea(@User('id') user, @Body() data: IdeaDTO): Promise<IdeaRO> {
    this.logData({user, data});
    return this.ideaService.create(user, data);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateIdea(@Param('id') id: string, @User('id') user: string, @Body() data: Partial<IdeaDTO>): Promise<IdeaRO> {
    this.logData({ id, user, data });
    return this.ideaService.update(id, user, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyIdea(@Param('id') id: string, @User('id') user) {
    this.logData({ id, user });
    return this.ideaService.destroy(id, user);
  }

}
