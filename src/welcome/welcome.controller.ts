import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from './interfaces/welcome.interface';

/*
0. hello라는 이름의 API endpoint를 보고 직관적인 이해가 되는가. X
1. hello라는 이름의 API에 확장성이 있는가. X

*. 해당 사유로 기획된 API 명세서의 변경이 논의 될 수 있는 집단인가. "?"

방안 및 의도
0. API route 변경 hello -> welcome/message
결과. welcome/message?name="홍길동" -> {% include 의문1 %}

1. welcome/data 등 접속시 데이터 제공 API 추가 확장 가능.
*/

// 기존 문제 + 상기 내용 이용한 API 답안.
// GET /welcome/message?name="홍길동"
@Controller('welcome')
export class WelcomeController {
  @Get('message')
  findAll(@Query('name') name: User['name']): string {
    console.log(name);
    return `${name}님. 안녕하세요.`;
  }

  // 의문0. endPoint는 예시가 아니다.
  // GET /welcome/message?name="홍길동" -> GET /welcome/message?name={name}

  // 의문1. 데이터를 그대로 사용하는데 필터링을 위한 쿼리를 적용해야하는가.
  // GET hello?name={name} -> GET hello/{name}

  // 상기 내용 추가 적용한 API 답안.
  // GET /welcome/message/:name
  @Get('message/:name')
  findOne(@Param('name') name: User['name']): string {
    console.log(name);
    return `${name}님. 안녕하세요.`;
  }
}

// Type Script가 아닌 TypeScript입니다.
