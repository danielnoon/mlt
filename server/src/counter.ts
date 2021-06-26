export function counter<T>(list: T[]) {
  return list.reduce<{ [key: string]: number }>(
    (prev, curr) => ({
      ...prev,
      [curr.toString()]: 1 + (prev[curr.toString()] || 0),
    }),
    {}
  );
}
