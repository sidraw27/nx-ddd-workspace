import { Order } from './order';
import { UserEmail } from './user-email';
import { UserPhone } from './user-phone';
import { FilterSoftDelete } from '../decorators';
import {
  Entity, OneToMany, PrimaryKey, Property,
} from '@mikro-orm/core';

@Entity()
@FilterSoftDelete()
export class User {
  @PrimaryKey({ columnType: 'bigint', autoincrement: false, defaultRaw: 'NEXT_ID()' })
  id!: bigint;

  @Property({ type: 'varchar', length: 50 })
  displayName!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ nullable: true, hidden: true })
  deletedAt?: Date;

  // Relations
  @OneToMany(() => UserEmail, (userEmail) => userEmail.user)
  emailInfos!: UserEmail[];

  @OneToMany(() => UserPhone, (userPhone) => userPhone.user)
  phoneInfos!: UserPhone[];

  @OneToMany(() => Order, (booking) => booking.user)
  orders?: Order[];
}
