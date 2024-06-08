import { Injectable } from '@nestjs/common';
import { Entry as TEntry } from './type';
import { DataSource } from 'typeorm';
import { Author } from './entities/author.entity';
import { Entry } from './entities/entry.entity';
import { Reaction } from './entities/reaction.entity';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class PopulateService {
  constructor(private dataSource: DataSource) {}

  async populate(data: TEntry[]) {
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      if (d.attachments.length === 0) {
        continue;
      }

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
              type: attachment.content_type,
            });
          }),
        });

        await tx.getRepository(Entry).save(entry);
      });
    }
  }
}
