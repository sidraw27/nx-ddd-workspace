import { AggregateRoot } from '@domain/common/aggregate-root';
import { AmountVo } from '@domain/order/value-objects/amount.vo';

interface OrderProps {
  id: bigint
  amount: AmountVo
}

export class OrderEntity extends AggregateRoot<OrderProps> {
  private constructor(props: OrderProps) {
    super(props);
  }

  public static create(props: OrderProps) {
    return new OrderEntity(props);
  }
}
