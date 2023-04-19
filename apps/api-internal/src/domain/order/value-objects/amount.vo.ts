import { ValueObject } from '@domain/common/value-objects/base.vo';

interface AmountProps {
  basic: number
  limit?: number
}

export class AmountVo extends ValueObject<AmountProps> {
  get text(): string {
    if (this.props.limit === null) {
      return `NT$ ${this.props.basic}`;
    }

    return `NT$${this.props.basic} ~ NT$${this.props.limit}`;
  }

  private constructor(props: AmountProps) {
    super(props);
  }

  public static create(props: AmountProps) {
    return new AmountVo(props);
  }
}
