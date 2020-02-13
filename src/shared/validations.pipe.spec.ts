import { ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';

describe('ValidationPipe:', () => {
  
  it('should created an instance', () => {
    const pipe = new ValidationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should do something', async () => {
    
    const emptyObject = {};
    const metadata: ArgumentMetadata = {
      type: 'body',
    };
    const pipe = new ValidationPipe();
    expect.assertions(2);

    try {
      await pipe.transform({}, metadata);
    } catch(e) {
      expect(e).toHaveProperty('message', 'Validation failed: No body submitted');
      expect(e).toHaveProperty('status', HttpStatus.BAD_REQUEST);
    }
      
  });

});