import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoGamesModule } from './video-games/video-games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { PriceService } from './price/price.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    VideoGamesModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, PriceService],
})
export class AppModule {}
