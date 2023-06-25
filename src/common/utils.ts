import omitBy from 'lodash.omitby';
import isUndefined from 'lodash.isundefined';

export const cleanObject = (
  object: Record<string, any>,
): Record<string, any> => {
  return omitBy(object, isUndefined);
};
