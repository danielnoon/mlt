import { useState } from "react";
import { Room } from "mlt-types";
import Center from "../../components/Center";
import Title from "../../components/text/Title";
import Button from "../../components/Button";
import Padding from "../../components/Padding";

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
        <Padding>
          <Title style={{ textAlign: "center" }}>
            Waiting for more players to join...
          </Title>
        </Padding>
      </Center>
    );
  } else {
    return (
      <Center flood>
        {ready ? (
          <Padding>
            <Title style={{ textAlign: "center" }}>
              Waiting for other players...
            </Title>
          </Padding>
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
