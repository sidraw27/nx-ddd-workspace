import { Filter } from '@mikro-orm/core';

export const FilterJoinSoftDelete = (field: string): ClassDecorator => Filter({
  name: 'withSoftDelete',
  // eslint-disable-next-line no-nested-ternary
  cond: {
    [field]: {
      deletedAt: null,
    },
  },
  default: true,
});
