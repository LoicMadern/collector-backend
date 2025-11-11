import { Module } from '@nestjs/common';
import { VideoGamesService } from './video-games.service';
import { VideoGamesController } from './video-games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoGame } from './entities/video-game.entity';
import { PriceService } from 'src/price/price.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([VideoGame]), HttpModule],
  controllers: [VideoGamesController],
  providers: [VideoGamesService, PriceService],
})
export class VideoGamesModule {}
