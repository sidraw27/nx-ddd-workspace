import { Order } from './order';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class OrderDetail {
  @PrimaryKey({ columnType: 'bigint', autoincrement: false, defaultRaw: 'NEXT_ID()' })
  id!: bigint;

  @ManyToOne(() => Order)
  order!: Order;

  @Property({ type: 'smallint' })
  quantity!: number;

  @Property()
  createdAt = new Date();
}
