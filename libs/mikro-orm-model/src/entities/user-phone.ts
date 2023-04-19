import { User } from './user';
import { FilterSoftDelete } from '../decorators';
import {
  Entity, ManyToOne, PrimaryKey, Property,
} from '@mikro-orm/core';

@Entity()
@FilterSoftDelete()
export class UserPhone {
  @PrimaryKey({ columnType: 'bigint', autoincrement: false, defaultRaw: 'NEXT_ID()' })
  id!: bigint;

  @ManyToOne(() => User)
  user!: User;

  @Property({ length: 10 })
  countryCode!: string;

  @Property({ length: 20 })
  phone!: string;

  @Property()
  isVerified = false;

  @Property()
  isPrimary = false;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ nullable: true, hidden: true })
  deletedAt?: Date;
}
