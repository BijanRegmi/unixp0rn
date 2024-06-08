import { Controller, Post } from '@nestjs/common';
import { PopulateService } from './populate.service';
import * as fs from 'fs';
import { Entry } from './type';

@Controller('app')
export class AppController {
  constructor(private populateService: PopulateService) {}

  @Post()
  async populate() {
    const d: Entry[] = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    await this.populateService.populate(d);
    return [];
  }
}
