import { useState } from "react";
import { Room } from "mlt-types";
import Center from "../../components/Center";
import Button from "../../components/Button";

interface ReviewingProps {
  room: Room;
  onReady: () => void;
}

const Reviewing = ({ room, onReady }: ReviewingProps) => {
  const [ready, setReady] = useState(false);

  function readyUp() {
    setReady(true);
    onReady();
  }

  return (
    <Center>
      <ul>
        {room.results
          .sort((a, b) => b.votes - a.votes)
          .map((player) => (
            <li key={player.user}>
              {room.players.find((p) => p.id === player.user)?.name}{" "}
              {player.votes}
            </li>
          ))}
      </ul>
      <Button large onClick={readyUp} disabled={ready}>
        Next Question
      </Button>
    </Center>
  );
};

export default Reviewing;
