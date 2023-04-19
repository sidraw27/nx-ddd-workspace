import { Entity, EntityProps } from '@domain/common/entities/base.entity';

export abstract class AggregateRoot<Props extends EntityProps> extends Entity<Props> {

}
