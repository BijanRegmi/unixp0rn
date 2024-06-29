import { Injectable, NotFoundException } from '@nestjs/common';
import { ContentType, ListBodyDto } from '@unixp0rn/types';
import {
  Between,
  DataSource,
  FindOptionsWhere,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { Entry } from './entities/entry.entity';
import axios from 'axios';
import { Attachment } from './entities/attachment.entity';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configuration';

const contentTypeMapping: { video: ContentType[]; image: ContentType[] } = {
  video: ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska'],
  image: ['image/png', 'image/gif', 'image/jpeg', 'image/webp', 'unknown'],
};

@Injectable()
export class AppService {
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService<AppConfig, true>,
  ) { }

  async list(options: ListBodyDto) {
    const { sort, filter } = options;

    const whereClause: FindOptionsWhere<Entry> = {};

    if (filter?.authorId) {
      whereClause.authorId = filter.authorId;
    }

    if (filter?.content) {
      whereClause.content = ILike(`%${filter.content}%`);
    }

    if (filter?.contentType) {
      whereClause.attachments = {
        type: In(contentTypeMapping[filter.contentType]),
      };
    }

    if (filter?.reactionCount) {
      if (filter.reactionCount.eq) {
        whereClause.reactionCount = filter.reactionCount.eq;
      } else if (filter.reactionCount.gt) {
        whereClause.reactionCount = MoreThan(filter.reactionCount.gt);
      } else if (filter.reactionCount.lt) {
        whereClause.reactionCount = LessThan(filter.reactionCount.lt);
      } else if (filter.reactionCount.gte) {
        whereClause.reactionCount = MoreThanOrEqual(filter.reactionCount.gte);
      } else if (filter.reactionCount.lte) {
        whereClause.reactionCount = LessThanOrEqual(filter.reactionCount.lte);
      } else if (filter.reactionCount.between) {
        whereClause.reactionCount = Between(
          filter.reactionCount.between.start,
          filter.reactionCount.between.end,
        );
      }
    }

    if (filter?.authorName) {
      whereClause.author = { username: ILike(`%${filter.authorName}%`) };
    }

    const entries = await this.dataSource.getRepository(Entry).find({
      where: whereClause,
      skip: options.skip || 0,
      take: options.take || 10,
      order: !sort
        ? undefined
        : sort?.field === 'Reaction_Count'
          ? { reactionCount: sort.order }
          : { timestamp: sort.order },
      relations: { author: true, reactions: true, attachments: true },
    });
    return entries;
  }

  async getImage(attachmentId: string) {
    const attachment = await this.dataSource
      .getRepository(Attachment)
      .findOne({ where: { id: attachmentId } });
    if (!attachment) {
      throw new NotFoundException('Attachment not found');
    }

    const response = await axios
      .get(attachment.url, { responseType: 'stream' })
      .catch(async () => {
        const imageUrl = this.configService.get('imageUrl');
        const newDataResponse = await axios.post(
          imageUrl,
          {
            attachment_urls: [attachment.url],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.configService.get('token'),
            },
          },
        );
        const newUrl = newDataResponse?.data?.refreshed_urls?.at(0)?.refreshed;

        if (typeof newUrl === 'string') {
          await this.dataSource
            .getRepository(Attachment)
            .update({ id: attachmentId }, { url: newUrl });
        }

        return axios.get(newUrl, { responseType: 'stream' });
      });
    return response;
  }
}
