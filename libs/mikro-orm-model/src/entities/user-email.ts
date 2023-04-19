import { User } from './user';
import { FilterSoftDelete } from '../decorators';
import {
  Entity, ManyToOne, PrimaryKey, Property, Unique,
} from '@mikro-orm/core';

@Entity()
@FilterSoftDelete()
export class UserEmail {
  @PrimaryKey({ columnType: 'bigint', autoincrement: false, defaultRaw: 'NEXT_ID()' })
  id!: bigint;

  @ManyToOne(() => User)
  user!: User;

  // manual condition where deleted_at is null
  @Unique()
  @Property({ type: 'varchar', length: 255 })
  email!: string;

  @Property()
  isVerified = false;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ nullable: true, hidden: true })
  deletedAt?: Date;
}
