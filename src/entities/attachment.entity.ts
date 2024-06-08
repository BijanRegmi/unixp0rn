import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Entry } from './entry.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Attachment extends BaseEntity {
  constructor(input?: DeepPartial<Attachment>) {
    super(input);
  }

  @Column({ type: String, unique: true })
  @PrimaryColumn()
  id: string;

  @Column({ type: String })
  filename: string;

  @Column({ type: String })
  url: string;

  @Column({ type: String })
  type: string;

  @ManyToOne(() => Entry, (entry) => entry.attachments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entryId' })
  entry: Entry;

  @Column({ type: String })
  entryId: string;
}
