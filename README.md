답안은 [src/welcome/welcome.controller.ts](https://github.com/FoocoJun/Dear-Hong/blob/main/src/welcome/welcome.controller.ts) 경로에 있습니다.

미리보기

```js
import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from './interfaces/welcome.interface';

@Controller('welcome')
export class WelcomeController {
  @Get('message/:name')
  findOne(@Param('name') name: User['name']): string {
    console.log(name);
    return `${name}님. 안녕하세요.`;
  }
}
```

---
이하 내용은 TIL 입니다.

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

---

백엔드 학습기회 제공에 감사를 전합니다.
