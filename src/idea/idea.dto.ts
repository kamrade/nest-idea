import { IsString, MinLength } from 'class-validator';
import { UserRO } from '../user/user.dto';

// Idea data transfer object with validations
export class IdeaDTO {

  @IsString()
  @MinLength(3, { message: "Title is too short" })
  idea: string;

  @IsString()
  description: string;

}

// Idea response object
export class IdeaRO {

  id?: string;
  updated: Date;
  created: Date;
  idea: string;
  description: string;
  author: UserRO;

}
