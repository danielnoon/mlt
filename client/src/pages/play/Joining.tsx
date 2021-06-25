import { useState } from "react";
import { Room } from "./types";
import Center from "../../components/Center";
import Title from "../../components/text/Title";
import Button from "../../components/Button";

interface JoiningProps {
  room: Room;
  onReady: () => void;
}

const Joining = ({ room, onReady }: JoiningProps) => {
  const [ready, setReady] = useState(false);

  function readyUp() {
    setReady(true);
    onReady();
  }

  if (room.players.length < 3) {
    return (
      <Center flood>
        <Title>Waiting for more players to join...</Title>
      </Center>
    );
  } else {
    return (
      <Center flood>
        {ready ? (
          <Title>Waiting for other players...</Title>
        ) : (
          <Button large onClick={readyUp}>
            Ready!
          </Button>
        )}
      </Center>
    );
  }
};

export default Joining;
