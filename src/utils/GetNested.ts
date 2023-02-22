export function getPropertyFromNestedObject<T, K extends keyof T>(obj: T, keys: K[]): T[K] | undefined {
  for (let i = 0; i < keys.length; i++) {
    obj = obj[keys[i]] as T;
    if (!obj) {
      return undefined;
    }
  }
  return obj as T[K];
}