import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PopulateService } from './populate.service';
import * as fs from 'fs';
import { Entry } from './type';
import { SortFields, SortOrder } from './dto/listentries.dto';

@Controller('app')
export class AppController {
  constructor(
    private appService: AppService,
    private populateService: PopulateService,
  ) {}

  @Get()
  list() {
    return this.appService.list({
      skip: 0,
      take: 10,
      sort: { field: SortFields.REACTION_COUNT, order: SortOrder.ASC },
      filter: { reactionCount: { between: { start: 50, end: 100 } } },
    });
  }

  @Post()
  async populate() {
    const d: Entry[] = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    await this.populateService.populate(d);
    return [];
  }
}
