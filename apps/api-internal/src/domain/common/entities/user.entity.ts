import { AggregateRoot } from '@domain/common/aggregate-root';
import { EmailVo } from '@domain/common/value-objects';

export interface UserProps {
  id: bigint
  email: EmailVo
}

export class UserEntity extends AggregateRoot<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  public static create(props: UserProps) {
    return new UserEntity(props);
  }

  public getBasicInfo() {
    const { id, email: { value: email } } = this.props;

    return {
      id,
      email
    };
  }
}
