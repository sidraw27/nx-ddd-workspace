import { Filter } from '@mikro-orm/core';

type SoftDeleteOptions = {
  enabled?: boolean;
  defaultIsDeleted?: boolean;
  field?: string;
};

const defaultOptions = { enabled: true, defaultIsDeleted: false, field: 'deletedAt' };

export const FilterSoftDelete = (options: SoftDeleteOptions = {}): ClassDecorator => {
  const { enabled, defaultIsDeleted, field } = { ...defaultOptions, ...options };

  return Filter({
    name: 'withSoftDelete',
    // eslint-disable-next-line no-nested-ternary
    cond: ({ isDeleted = defaultIsDeleted }: { isDeleted?: boolean } = {}) => (isDeleted ? { [field]: { $ne: null } } : !isDeleted ? { [field]: null } : {}),
    args: false,
    default: enabled,
  });
};
