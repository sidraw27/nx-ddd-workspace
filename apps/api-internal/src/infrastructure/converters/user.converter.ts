import { UserEntity } from '@domain/common/entities';
import { EmailVo } from '@domain/common/value-objects';
import { BaseConverter } from '@infrastructure/converters/base.converter';
import { wrap } from '@mikro-orm/core';
import { User } from '@model/entities';

export class UserConverter extends BaseConverter<UserEntity, any> {
  public toModel(entity: UserEntity): any {
    return {

    };
  }

  public toEntity(model: User): UserEntity {
    const { id, emailInfos: [{ email }] } = wrap(model).toObject();

    return UserEntity.create({
      id,
      email: EmailVo.create(email),
    });
  }
}
