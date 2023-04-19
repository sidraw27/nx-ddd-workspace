import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseConverter<T, S> {
  public abstract toModel(entity: T): S;
  public abstract toEntity(dto: S): T;
}
