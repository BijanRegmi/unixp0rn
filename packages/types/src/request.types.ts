export type SortOrder = 'ASC' | 'DESC';

export type SortFields = 'Reaction_Count' | 'Timestamp';

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
  contentType?: 'video' | 'image';
}

export interface ListBodyDto {
  skip?: number;
  take?: number;
  sort?: ListSort;
  filter?: ListFilter;
}
