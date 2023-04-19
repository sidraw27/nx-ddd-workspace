import { ValueObject } from '@domain/common/value-objects/base.vo';
import * as crypto from 'crypto';

type UUIDValue = string;

interface UUIDProps {
  value: UUIDValue
}

export class UUIDVo extends ValueObject<UUIDProps>
{
  get value() {
    return this.props.value;
  }

  private constructor(props: UUIDProps) {
    super(props);
  }

  public static create(value: UUIDValue): UUIDVo {
    return new UUIDVo({ value });
  }

  public static generate(): UUIDVo {
    const uuid = crypto.randomUUID();

    return UUIDVo.create(uuid);
  }
}
