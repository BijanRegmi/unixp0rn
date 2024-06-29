import { Injectable, Logger } from '@nestjs/common';
import { RawEntry } from '@unixp0rn/types';
import { DataSource } from 'typeorm';
import { Author } from './entities/author.entity';
import { Entry } from './entities/entry.entity';
import { Reaction } from './entities/reaction.entity';
import { Attachment } from './entities/attachment.entity';
import * as cliProgress from 'cli-progress';
// import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configuration';
import { readFileSync } from 'fs';
import { join } from 'path';

const bar = new cliProgress.SingleBar({
  format: 'Adding Entries | {bar} | {percentage}% | {value}/{total} Entries',
});

const loggerCtx = 'PopulateService';

@Injectable()
export class PopulateService {
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService<AppConfig, true>,
  ) {}

  async populate(data: RawEntry[]) {
    const count = await this.dataSource.getRepository(Entry).count();
    bar.start(count + data.length, count);

    let skipped = 0,
      failed = 0;

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      if (d.attachments?.length === 0) {
        skipped++;
        continue;
      }

      d.reactions = d.reactions || [];

      await this.dataSource.transaction(async (tx) => {
        const author = new Author({
          id: d.author.id,
          username: d.author.username,
        });

        const savedAuthor = await tx.getRepository(Author).save(author);

        const entry = new Entry({
          id: d.id,
          content: d.content,
          timestamp: d.timestamp.toString(),
          authorId: savedAuthor.id,
          reactionCount: d.reactions.reduce(
            (total, reaction) => reaction.count + total,
            0,
          ),
          reactions: d.reactions.map((reaction) => {
            return new Reaction({
              name: reaction.emoji.name,
              count: reaction.count,
            });
          }),
          attachments: d.attachments.map((attachment) => {
            return new Attachment({
              id: attachment.id,
              filename: attachment.filename,
              url: attachment.url,
              type: attachment.content_type || 'unknown',
            });
          }),
        });

        await tx
          .getRepository(Entry)
          .save(entry)
          .then(() => {
            bar.increment();
          })
          .catch(() => {
            failed++;
          });
      });
    }
    bar.stop();

    // prettier-ignore
    skipped && Logger.log(`Skipped ${skipped} entries because no attachments`, loggerCtx);
    failed && Logger.log(`Failed to save ${failed} entries`, loggerCtx);
  }

  async init() {
    const data: RawEntry = JSON.parse(
      readFileSync(join(__dirname, '../data/init.json'), 'utf8'),
    );
    await this.populate([data]);
    return data.id;
  }

  // @Cron('*/5 * * * * *')
  async populateNextEntries() {
    const lastEntry = await this.dataSource.getRepository(Entry).find({
      order: { timestamp: 'DESC' },
      take: 1,
      relations: { author: true, reactions: true, attachments: true },
    });

    let id = lastEntry.pop()?.id;
    const dataUrl = this.configService.get('dataUrl');
    if (!dataUrl) {
      Logger.error('No URL found in config', loggerCtx);
      return;
    }

    if (!id) {
      Logger.error('No entries found', loggerCtx);
      id = await this.init();
    }

    const headers = new Headers();
    headers.append('authorization', this.configService.get('token'));
    const res: RawEntry[] | undefined = await fetch(
      `${dataUrl}${id}&limit=100`,
      {
        method: 'GET',
        headers,
      },
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        Logger.error('Failed to get next entries', loggerCtx);
        return;
      });
    if (res && res.length > 0) {
      await this.populate(res);
    } else {
      console.log(res);
      Logger.error('No entries found', loggerCtx);
    }
  }
}
