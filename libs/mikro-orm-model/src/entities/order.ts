import { OrderDetail } from './order-detail';
import { User } from './user';
import { Entity, Enum, Index, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';

export enum OrderStatus {
  PENDING,
  IN_PROCESSING,
  COMPLETED,
  CANCELED,
}

@Entity()
export class Order {
  @PrimaryKey({ columnType: 'bigint', autoincrement: false, defaultRaw: 'NEXT_ID()' })
  id!: bigint;

  @ManyToOne()
  user!: User;

  @Property({ type: 'decimal' })
  amount!: number;

  @Property({ type: 'varchar' })
  serialNo?: string;

  @Index()
  @Enum(() => OrderStatus)
  status: OrderStatus = OrderStatus.PENDING;

  @Property({ type: 'varchar', nullable: true })
  note?: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  // Relations
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  details!: OrderDetail[];
}
