import { Room } from "mlt-types";
import Center from "../../components/Center";
import Question from "../../components/Question";
import Flex from "../../components/Flex";
import Button from "../../components/Button";
import { useState } from "react";
import Grid from "../../components/Grid";
import Padding from "../../components/Padding";

interface DeliberatingProps {
  room: Room;
  onSelect: (id: string) => void;
}

const Deliberating = ({ room, onSelect }: DeliberatingProps) => {
  const [selection, setSelection] = useState<string | null>(null);

  function select(id: string) {
    if (!selection) {
      setSelection(id);
      onSelect(id);
    }
  }

  return (
    <Grid flood templateColumns="100%" templateRows="1fr 300px">
      <Center>
        <Question>{room.question}</Question>
      </Center>
      <Padding flood="y" style={{ overflowY: "auto", maxHeight: "300px" }}>
        <Center>
          <Flex
            flood
            columnGap={36}
            rowGap={24}
            justify="center"
            items="flex-start"
            content="flex-start"
            wrap
          >
            {room.players.map((player) => (
              <Button
                large
                key={player.id}
                color={player.id === selection ? "green" : "orange"}
                disabled={!!selection && player.id !== selection}
                onClick={() => select(player.id)}
              >
                {player.name}
              </Button>
            ))}
          </Flex>
        </Center>
      </Padding>
    </Grid>
  );
};

export default Deliberating;
