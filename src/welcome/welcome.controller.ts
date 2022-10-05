import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from './interfaces/welcome.interface';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

@Controller('welcome')
@ApiTags('유저 방문 환영합니다 API')
export class WelcomeController {
  @ApiOperation({
    summary: '유저에게 환영 메세지를 제공하는 API',
    description: '사용자 이름 기반 메세지를 제공한다.',
  })
  @ApiCreatedResponse({ description: '메세지 생성완료.' })
  @ApiParam({
    name: 'name',
    required: true,
    description: '메세지에 들어갈 이름',
    example: '홍길동',
  })
  @Get('message/:name')
  findOne(@Param('name') name: User['name']): string {
    return `${name}님. 안녕하세요.`;
  }
}
