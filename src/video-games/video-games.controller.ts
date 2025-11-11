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
import { PriceService } from 'src/price/price.service';

@Controller('video-games')
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGamesService, private readonly priceService : PriceService) {}

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
    return this.videoGamesService.findOne(id);
  }

  @Get('estimate-price/:id')
  async estimatePrice(@Param('id') id: string) {
    let game = await this.videoGamesService.findOne(id);
    this.priceService.getPrice(game!.name).subscribe({
      next: async (response) => {
        await this.videoGamesService.update(id, {
          price: response.data.used_price,
        } as UpdateVideoGameDto);
        return
      },
      error: (error) => {
        console.error('Error fetching price:', error);
        return
      },
    });
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
