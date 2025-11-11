import { Injectable } from '@nestjs/common';
import { CreateVideoGameDto } from './dto/create-video-game.dto';
import { UpdateVideoGameDto } from './dto/update-video-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoGame } from './entities/video-game.entity';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuidv4 } from 'uuid';
import { PriceService } from 'src/price/price.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class VideoGamesService {
  constructor(
    @InjectRepository(VideoGame)
    private repo: Repository<VideoGame>,
    private priceService : PriceService
  ) {}
  async create(createVideoGameDto: CreateVideoGameDto) {
    await this.repo.save(createVideoGameDto);
    return 'This action adds a new videoGame';
  }

  findAll(): Promise<VideoGame[]> {
    return this.repo.find();
  }

  async estimatePrice(id :string): Promise<number | null> {
   const game = await this.findOne(id);
    if (!game || !game.name) return null;

    try {
      const response = await lastValueFrom(this.priceService.getPrice(game.name));
      const price = response?.data?.used_price ?? null;
      if (price === null) return null;
      return typeof price === 'number' ? price : Number(price);
    } catch (error) {
      console.error('Error fetching price:', error);
      return null;
    }
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateVideoGameDto: UpdateVideoGameDto) {
    await this.repo.update(id, updateVideoGameDto);
    return `This action updates a #${id} videoGame`;
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return `This action removes a #${id} videoGame`;
  }
}
