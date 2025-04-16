import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideoGamesService } from './video-games.service';
import { CreateVideoGameDto } from './dto/create-video-game.dto';
import { UpdateVideoGameDto } from './dto/update-video-game.dto';

@Controller('video-games')
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGamesService) {}

  @Post()
  create(@Body() createVideoGameDto: CreateVideoGameDto) {
    console.log('createVideoGameDto', createVideoGameDto);
    return this.videoGamesService.create(createVideoGameDto);
  }

  @Get()
  findAll() {
    return this.videoGamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoGamesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideoGameDto: UpdateVideoGameDto,
  ) {
    return this.videoGamesService.update(id, updateVideoGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoGamesService.remove(id);
  }
}
