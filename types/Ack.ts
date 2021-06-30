export default interface Ack<T> {
  data: T | null;
  error: string;
}
