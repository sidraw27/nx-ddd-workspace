import { ValueObject } from '@domain/common/value-objects/base.vo';
import dayjs from 'dayjs';

interface DateProps {
  value: Date
}

export class DateVo extends ValueObject<DateProps> {
  get text() {
    const { value } = this.props;

    return value !== null ? dayjs(value).format('YYYY-MM-DD HH:mm') : null;
  }

  private constructor(protected props: DateProps) {
    super(props);
  }

  public static create(value: Date): DateVo {
    return new DateVo({ value });
  }
}
