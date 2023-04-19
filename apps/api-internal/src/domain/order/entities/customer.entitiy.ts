import { Entity, UserEntity, UserProps } from '@domain/common/entities';
import { ImageVo } from '@domain/common/value-objects';

export interface CustomerProps extends UserProps {
  avatar: ImageVo
}

export class CustomerEntity extends Entity<CustomerProps> {
  private constructor(props: CustomerProps, private userEntity: UserEntity) {
    super(props);
  }

  /**
   * Composite Pattern
   */
  public static create(props: CustomerProps) {
    return new CustomerEntity(props, UserEntity.create(props));
  }

  public getBasicInfo() {
    const info = this.userEntity.getBasicInfo();
    info.id = this.props.id;

    return info;
  }
}
