import { Injectable } from '@nestjs/common';
import { ListBodyDto, SortFields } from './dto/listentries.dto';
import {
  Between,
  DataSource,
  FindOptionsWhere,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { Entry } from './entities/entry.entity';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

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
      whereClause.attachments = { type: filter.contentType };
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

    const entries = await this.dataSource.getRepository(Entry).find({
      where: whereClause,
      skip: options.skip,
      take: options.take,
      order: !sort
        ? undefined
        : sort?.field === SortFields.REACTION_COUNT
        ? { reactionCount: sort.order }
        : { timestamp: sort.order },
      relations: { author: true, reactions: true, attachments: true },
    });
    return entries;
  }
}
