import { ContentType } from './raw.types';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortFields {
  REACTION_COUNT = 'Reaction_Count',
  TIMESTAMP = 'Timestamp',
}

export interface ListSort {
  field: SortFields;
  order: SortOrder;
}

export interface NumberRange {
  start: number;
  end: number;
}

export interface NumberFilter {
  eq?: number;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  between?: NumberRange;
}

export interface ListFilter {
  authorId?: string;
  content?: string;
  reactionCount?: NumberFilter;
  contentType?: ContentType;
}

export interface ListBodyDto {
  skip?: number;
  take?: number;
  sort?: ListSort;
  filter?: ListFilter;
}
