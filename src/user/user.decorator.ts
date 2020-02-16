import { createParamDecorator } from '@nestjs/common';

export const User: Function = createParamDecorator((data, req) => {
  return data ? req.user[data] : req.user;
});