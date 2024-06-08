import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Entry } from './entry.entity';
import { BaseEntity } from './base.entity';

@Entity()
@Unique(['entryId', 'name'])
export class Reaction extends BaseEntity {
  constructor(input?: DeepPartial<Reaction>) {
    super(input);
  }

  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: String })
  name: string;

  @Column({ type: Number })
  count: number;

  @ManyToOne(() => Entry, (entry) => entry.reactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entryId' })
  entry: Entry;

  @Column({ type: String })
  entryId: string;
}
