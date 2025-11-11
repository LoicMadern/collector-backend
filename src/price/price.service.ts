// price.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PriceService {
  constructor(private readonly httpService: HttpService) {}

  getPrice(game: string) {
    const url = `http://localhost:5000/get_price?game=${game}`;
    return this.httpService.get(url);
        
  }
}
