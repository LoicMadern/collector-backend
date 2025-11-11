import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PriceService {
  private readonly API_BASE_URL = 'http://localhost:5000/get_price';
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY_MS = 1000; // 1 seconde

  constructor(private readonly httpService: HttpService) {}

  async getPrice(game: string) : Promise<{used_price : number}|undefined  >  {
    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        const url = `${this.API_BASE_URL}?game=${game}`;
        const response = await lastValueFrom(this.httpService.get(url));
        return response.data;
  
      } catch (error) {
        if (attempt === this.MAX_RETRIES) {
          throw new Error(`Échec après ${this.MAX_RETRIES} tentatives : ${error.message}`);
        }
        // Délai exponentiel : 1s, 2s, 4s, etc.
        const delay = this.RETRY_DELAY_MS * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}
