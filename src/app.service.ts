import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello MofS! <button onclick="location.href='/swagger'">Swagger</button>`;
  }
}
