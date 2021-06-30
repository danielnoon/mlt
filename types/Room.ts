import Result from "./Result";
import User from "./User";

export default interface Room {
  question: string;
  state: "joining" | "deliberating" | "reviewing";
  code: string;
  host: string;
  players: User[];
  queue: User[];
  ready: string[];
  category: string;
  results: Result[];
}
