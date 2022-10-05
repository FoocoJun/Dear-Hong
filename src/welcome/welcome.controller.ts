import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from './interfaces/welcome.interface';

@Controller('welcome')
export class WelcomeController {

  @Get('message')
  findAll(@Query('name') name: User['name']): string {
    console.log(name);
    return `${name}님. 안녕하세요.`;
  }
}