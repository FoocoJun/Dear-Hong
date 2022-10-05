답안은 [src/welcome/welcome.controller.ts](https://github.com/FoocoJun/Dear-Hong/blob/main/src/welcome/welcome.controller.ts) 경로에 있습니다.

미리보기

```js
import { Controller, Get, Param } from '@nestjs/common';
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
```
![image](https://user-images.githubusercontent.com/85068289/194109086-46518846-70ce-483f-a97b-3c12b1953e17.png)


## 의식의 흐름
1. hello라는 이름의 API endpoint를 보고 직관적인 이해가 되는가. X
2. hello라는 이름의 API에 확장성이 있는가. X

- 해당 사유로 기획된 API 명세서의 변경이 논의 될 수 있는 집단인가? "?"
### 방안 및 기대결과
```
0. API route 변경 hello -> welcome/message
결과. welcome/message?name="홍길동" -> {% include 하단 의문1 %}
1. welcome/data 등 접속시 데이터 제공 API 추가 확장 가능.
```

### 기존 문제 + 상기 내용 적용한 API 답안.
**GET /welcome/message?name="홍길동"**
```js
import { Controller, Get, Query } from '@nestjs/common';
import { User } from './interfaces/welcome.interface';

@Controller('welcome')
export class WelcomeController {
  @Get('message')
  findAll(@Query('name') name: User['name']): string {
    return `${name}님. 안녕하세요.`;
  }
}
```

### 추가 의문 및 방안
```
  0. endPoint는 예시가 아니다.
  GET /welcome/message?name="홍길동" -> GET /welcome/message?name={name}

  의문1. 데이터를 그대로 사용하는데 필터링을 위한 쿼리를 적용해야하는가.
  GET hello?name={name} -> GET hello/{name}
```
### 상기 내용 추가 적용한 API 답안.
**GET /welcome/message/:name**

```js
import { Controller, Get, Query } from '@nestjs/common';
import { User } from './interfaces/welcome.interface';

@Controller('welcome')
export class WelcomeController {
  @Get('message/:name')
  findOne(@Param('name') name: User['name']): string {
    return `${name}님. 안녕하세요.`;
  }
}
```


---
# TIL
이하 내용은 TIL 입니다.

## NestJs
NestJS docs를 이용하여 작성하였습니다.

```
npm i -g @nestjs/cli
nest new project-name
```

### Controller
Controller는 들어오는 요청을 처리하고 응답을 반환하는 역할을합니다.
요청 주소(endpoint)에 대해 특정 컨트롤러를 라우팅 할 수 있습니다..
`@Controller()` 데코레이터를 경로 접두사로서 사용하면 쉽게 그룹화 할 수 있습니다.

CLI를 사용해 컨트롤러를 생성하였습니다.
```
$ nest g controller controller-name
```
### Provider
Provider은 컨트롤러에서 처리하기 복잡한(또는 반복되는) 작업을 분리하여 작업하기 위한 공간입니다.

```
$ nest g service service-name
```

### Module
Module은 애플리케이션 구조를 구성합니다. 

하나의 모듈은 컨트롤러를 담는 controller 와 서비스를 담는 프로바이더로 구성합니다.

필요시 외부 모듈을 적용 하여 보다 큰 캡슐화를 시도할 수 있습니다.

```
$ nest g module module-name
```

## SwaggerUI
[@nestjs/swagger docs](https://docs.nestjs.com/openapi/introduction)를 이용하여 작성하였습니다.

### DocumentBuilder, SwaggerModule
**DocumentBuilder**
스웨거 문서 config 작성 - 제목, 설명, 버전 등.
**SwaggerModule**
- createDocument : 
app Application을 기반으로 config 적용하여 문서 모듈 생성.
- setup : 
1번 매개변수 path에 어플리케이션 다큐먼트 제공. `다큐먼트 형성 시 app을 제공 했는데 왜..?`
```js
const config = new DocumentBuilder()
    .setTitle('Dear-Hong')
    .setDescription('이름 제공시 안녕하세요 서비스')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
```



### @ApiTags
Controller 수준의 설명 제공
```js
@Controller('welcome')
@ApiTags('유저 방문 환영합니다 API')
```
![image](https://user-images.githubusercontent.com/85068289/194105555-fbecd632-393a-46d0-8aae-83acca3af413.png)


### @ApiOperation
EndPoint 수준의 설명 제공
```js
@ApiOperation({
    summary: '유저에게 환영 메세지를 제공하는 API',
    description: '사용자 이름 기반 메세지를 제공한다.',
  })
```
![image](https://user-images.githubusercontent.com/85068289/194105462-bafbbf0a-544a-4b61-a6e0-97d272fe5399.png)


### @ApiParam, @ApiQuery
Api에 사용되는 Param, Query 수준의 설명 제공
파라미터의 이름, 필수여부, 설명, 예시 제공 가능.
```js
@ApiParam({
    name: 'name',
    required: true,
    description: '메세지에 들어갈 이름',
    example: '홍길동',
  })
```
![image](https://user-images.githubusercontent.com/85068289/194106041-b85de904-11ec-4f28-8cc0-e552b38a1e3f.png)


---

백엔드 학습기회 제공에 감사를 전합니다.
