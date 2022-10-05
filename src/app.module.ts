import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WelcomeModule } from './welcome/welcome.module';

@Module({
  imports: [WelcomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
