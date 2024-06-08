import { Injectable } from '@nestjs/common';
import { ListBodyDto, SortFields, SortOrder } from './dto/listentries.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}
}
