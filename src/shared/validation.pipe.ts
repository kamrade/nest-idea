import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  
  async transform(value: any, metadata: ArgumentMetadata) {

    console.log('--- value:', value);

    if (value instanceof Object && ValidationPipe.isEmpty(value)) {
      throw new HttpException(
        'Validation failed: No body submitted', 
        HttpStatus.BAD_REQUEST
      );
    }
    
    const { metatype } = metadata;

    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      
      // throw new BadRequestException('Validation failed');
      
      throw new HttpException(
        `Validation failed: ${ValidationPipe.formatErrors(errors)}`,
        HttpStatus.BAD_REQUEST
      );
    }
    return value;
  }

  private static toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private static formatErrors(errors: any[]) {
    return errors.map(err => {
      for (let property in err.constraints) {
        return err.constraints[ property ];
      }
    }).join(', ');
  }

  private static isEmpty(value: any) {
    return Object.keys(value).length <= 0;
  }
}
