import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from './interfaces/welcome.interface';

// 0. hello라는 이름이 API를 보고 받아들일 수 있는가.
// 1. hello라는 이름이 API 확장성이 있는가.

// 방안 및 의도
// API route 변경 hello -> welcome
// welcome/message?name='홍길동' -> 의문1 추가.
// 추후 welcome/data 등 접속시 제공 데이터 API 추가 확장 가능.

@Controller('welcome')
export class WelcomeController {

  // 기존 문제 query를 이용한 API 답.
  // GET /welcome/message?name={name}
  @Get('message')
  findAll(@Query('name') name: User['name']): string {
    console.log(name);
    return `${name}님. 안녕하세요.`;
  }

  // 의문0. endPoint는 예시가 아니다.
  // GET /hello?name='홍길동' -> GET /hello?name={name}

  // 의문1. 데이터를 그대로 사용하는데 필터링을 위한 Query를 적용해야하는가.
  // GET hello?name={name} -> GET hello/{name}
  // GET /welcome/message/:name
  @Get('message/:name')
  findOne(@Param('name') name: User['name']): string {
    console.log(name);
    return `${name}님. 안녕하세요.`;
  }
}

// Type Script가 아닌 TypeScript입니다.