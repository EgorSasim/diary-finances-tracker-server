export function getTruthyTypes<T = object>(obj: T): T {
  const truthyTypesObj = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value === 'null' || value === 'undefined') {
      truthyTypesObj[key] = null;
    } else {
      truthyTypesObj[key] = value;
    }
  });
  return truthyTypesObj as T;
}
