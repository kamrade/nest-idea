import { IsNotEmpty } from 'class-validator';

// user data transfer object
export class UserDTO {

  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  password: string;

}

// user response object
export class UserRO {
  id: string;
  username: string;
  created: Date;
  token?: string;
}
