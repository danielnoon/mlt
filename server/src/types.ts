export interface User {
  name: string;
  id: string;
  room: string;
}

export interface Room {
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

export interface Result {
  votes: number;
  user: string;
}

export interface Submission {
  user: string;
  choice: string;
}

export interface Ack<T> {
  data: T | null;
  error: string;
}
