export default class Room {
  constructor(
    public id: string,
    public players: string[] = [],
    public host: string
  ) {}
}
