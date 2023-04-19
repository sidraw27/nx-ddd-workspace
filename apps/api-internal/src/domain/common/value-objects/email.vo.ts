import { ValueObject } from '@domain/common/value-objects/base.vo';

interface EmailProps {
  value: string
}

export class EmailVo extends ValueObject<EmailProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(value: string): EmailVo {
    return new EmailVo({ value });
  }
}
