import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContentType } from 'src/type';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortFields {
  REACTION_COUNT = 'Reaction_Count',
  TIMESTAMP = 'Timestamp',
}

class ListSort {
  @IsEnum(SortFields)
  field: SortFields;

  @IsEnum(SortOrder)
  order: SortOrder;
}

class NumberRange {
  @IsNumber()
  start: number;

  @IsNumber()
  end: number;
}

class NumberFilter {
  @IsNumber()
  @IsOptional()
  eq?: number;

  @IsNumber()
  @IsOptional()
  lt?: number;

  @IsNumber()
  @IsOptional()
  lte?: number;

  @IsNumber()
  @IsOptional()
  gt?: number;

  @IsNumber()
  @IsOptional()
  gte?: number;

  @Type(() => NumberRange)
  @ValidateNested()
  @IsOptional()
  between?: NumberRange;
}

class ListFilter {
  @IsString()
  @IsOptional()
  authorId?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @Type(() => NumberFilter)
  @ValidateNested()
  @IsOptional()
  reactionCount?: NumberFilter;

  @IsEnum(ContentType)
  @IsOptional()
  contentType?: ContentType;
}

export class ListBodyDto {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsNumber()
  @IsOptional()
  take?: number;

  @IsOptional()
  @Type(() => ListSort)
  @ValidateNested()
  sort?: ListSort;

  @IsOptional()
  @Type(() => ListFilter)
  @ValidateNested()
  filter?: ListFilter;
}
