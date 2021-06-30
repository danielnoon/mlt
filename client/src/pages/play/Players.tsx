import { Room } from "mlt-types";
import Padding from "../../components/Padding";
import { Heading2 } from "../../components/Typography";
import { Done } from "@material-ui/icons";

interface PlayersProps {
  room: Room;
}

const Players = ({ room }: PlayersProps) => {
  const players = room.players;
  const readyPlayers = new Set(
    room.players.filter((player) => room.ready.includes(player.id))
  );

  return (
    <Padding>
      <Heading2>Players</Heading2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name}
            {readyPlayers.has(player) && (
              <Done
                style={{ marginLeft: 8, marginBottom: "-0.1em" }}
                fontSize="small"
              />
            )}
          </li>
        ))}
      </ul>
      {room.queue.length > 0 && (
        <>
          <Heading2>Queue</Heading2>
          {room.queue.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </>
      )}
    </Padding>
  );
};

export default Players;
