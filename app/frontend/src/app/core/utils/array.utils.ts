// adds or updates an element in an array by key
export function upsertByKey<T, K extends keyof T>(array: T[], item: T, key: K): T[] {
  const index = array.findIndex((el) => el[key] === item[key]);

  if (index > -1) {
    array[index] = { ...array[index], ...item };
  } else {
    array.push(item);
  }

  return array;
}

// adds or overwrites an element in an array by key
export function setOneByKey<T, K extends keyof T>(array: T[], item: T, key: K): T[] {
  const index = array.findIndex((el) => el[key] === item[key]);

  if (index === -1) {
    return [...array, item];
  }

  return array.map((el) => (el[key] === item[key] ? item : el));
}
