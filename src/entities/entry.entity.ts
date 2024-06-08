import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Author } from './author.entity';
import { Attachment } from './attachment.entity';
import { Reaction } from './reaction.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Entry extends BaseEntity {
  constructor(input?: DeepPartial<Entry>) {
    super(input);
  }

  @Column({ type: String, unique: true })
  @PrimaryColumn()
  id: string;

  @Column({ type: Date })
  timestamp: Date;

  @Column({ type: String })
  content: string;

  @Column({ type: Number })
  reactionCount: number;

  @ManyToOne(() => Author, (author) => author.entries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Column({ type: String })
  authorId: string;

  @OneToMany(() => Attachment, (attachment) => attachment.entry, {
    cascade: true,
  })
  attachments: Attachment[];

  @OneToMany(() => Reaction, (reaction) => reaction.entry, { cascade: true })
  reactions: Reaction[];
}
