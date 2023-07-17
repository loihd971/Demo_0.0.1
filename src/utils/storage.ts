export const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value ? JSON.parse(value) : null;
};
