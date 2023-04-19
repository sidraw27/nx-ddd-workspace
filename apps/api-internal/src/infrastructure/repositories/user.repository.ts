import { UserEntity } from '@domain/common/entities';
import { IUserRepository } from '@domain/common/repositories/user.repository';
import { UserConverter } from '@infrastructure/converters';
import {
  EntityRepository,
  NotFoundError,
  UniqueConstraintViolationException
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '@model/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  public constructor(
    @InjectRepository(User)
    private readonly repository: EntityRepository<User>,
    private readonly converter: UserConverter
  ) {
  }

  async create(payload: { name: string, email: string, phone: { countryCode: string, number: string }}): Promise<UserEntity> {
    const { name, email, phone } = payload;

    const user = await this.repository.create({
      displayName: name,
      emailInfos: [{ email }],
      phoneInfos: [{
        countryCode: phone.countryCode,
        phone: phone.number
      }]
    });

    try {
      await this.repository.persistAndFlush(user);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException('Conflict', HttpStatus.CONFLICT);
      }
      throw e;
    }

    return this.converter.toEntity(user);
  }

  async find(id: bigint): Promise<UserEntity> {
    let user: User;

    try {
      user = await this.repository.findOneOrFail(
        id,
        {
          populate: [
            'emailInfos',
          ],
        }
      );
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    return this.converter.toEntity(user);
  }
}
