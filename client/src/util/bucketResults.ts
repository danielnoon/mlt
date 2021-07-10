import { Result } from "mlt-types";

export default function bucket(results: Result[]) {
  return results.reduce<Result[][]>((prev, curr) => {
    if (prev.length === 0) {
      return [[curr]];
    }

    const pp = prev.slice(-1)[0];

    if (pp[0].votes === curr.votes) {
      pp.push(curr);
      return [...prev.slice(0, -1), pp];
    } else {
      return [...prev, [curr]];
    }
  }, [] as Result[][]);
}
