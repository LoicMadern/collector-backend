import { Injectable } from '@nestjs/common';
import { CreateVideoGameDto } from './dto/create-video-game.dto';
import { UpdateVideoGameDto } from './dto/update-video-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoGame } from './entities/video-game.entity';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VideoGamesService {
  constructor(
    @InjectRepository(VideoGame)
    private repo: Repository<VideoGame>,
  ) {}
  async create(createVideoGameDto: CreateVideoGameDto) {
    await this.repo.save(createVideoGameDto);
    return 'This action adds a new videoGame';
  }

  findAll(): Promise<VideoGame[]> {
    return this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} videoGame`;
  }

  async update(id: string, updateVideoGameDto: UpdateVideoGameDto) {
    console.log('updateVideoGameDto', updateVideoGameDto);
    console.log('id', id);
    await this.repo.update(id, updateVideoGameDto);
    return `This action updates a #${id} videoGame`;
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return `This action removes a #${id} videoGame`;
  }
}
