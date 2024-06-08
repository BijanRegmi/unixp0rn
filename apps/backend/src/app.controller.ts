import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { SortFields, SortOrder } from '@unixp0rn/types';
import { Response } from 'express';

@Controller('app')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  list() {
    return this.appService.list({
      skip: 0,
      take: 10,
      sort: { field: SortFields.REACTION_COUNT, order: SortOrder.ASC },
      filter: { reactionCount: { between: { start: 50, end: 100 } } },
    });
  }

  @Get('/image')
  async url(
    @Query('url') url: string,
    @Query('attachmentId') attachmentId: string,
    @Res() response: Response,
  ) {
    if (!url || !attachmentId) {
      return response.status(400).send('Bad request');
    }

    const image = await this.appService.getImage(url, attachmentId);

    if (!image) {
      return response.status(404).send('Not found');
    }

    return image.data.pipe(response);
  }
}
