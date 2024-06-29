import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ListBodyDto, ListResponse } from '@unixp0rn/types';
import { Response } from 'express';

@Controller('app')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async list(@Query() query: ListBodyDto): Promise<ListResponse[]> {
    if (typeof query.skip === 'string') {
      query.skip = Number(query.skip);
    }
    if (typeof query.take === 'string') {
      query.take = Number(query.take);
    }
    if (typeof query.filter === 'string') {
      query.filter = JSON.parse(query.filter);
    }
    if (typeof query.sort === 'string') {
      query.sort = JSON.parse(query.sort);
    }
    const entries = await this.appService.list(query);

    return entries.map((e) => {
      return {
        id: e.id,
        timestamp: e.timestamp,
        content: e.content,
        reactionCount: e.reactionCount,
        author: { id: e.author.id, username: e.author.username },
        authorId: e.authorId,
        attachments: e.attachments.map((a) => ({
          id: a.id,
          url: a.url,
          type: a.type,
          filename: a.filename,
          entryId: a.entryId,
        })),
        reactions: e.reactions.map((r) => ({
          id: r.id,
          url: r.url || undefined,
          name: r.name,
          count: r.count,
          entryId: r.entryId,
        })),
      };
    });
  }

  @Get('/ping')
  ping() {
    return 'ok';
  }

  @Get('/image')
  async url(
    @Query('attachmentId') attachmentId: string,
    @Res() response: Response,
  ) {
    if (!attachmentId) {
      return response.status(400).send('Bad request');
    }

    const image = await this.appService.getImage(attachmentId);

    if (!image) {
      return response.status(404).send('Not found');
    }

    return image.data.pipe(response);
  }
}
