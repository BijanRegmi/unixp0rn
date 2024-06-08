import { Column, DeepPartial, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Entry } from './entry.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Author extends BaseEntity {
  constructor(input?: DeepPartial<Author>) {
    super(input);
  }

  @Column({ type: String, unique: true })
  @PrimaryColumn()
  id: string;

  @Column({ type: String })
  username: string;

  @OneToMany(() => Entry, (entry) => entry.author)
  entries: Entry[];
}
