import { useState } from "react";
import { Room } from "mlt-types";
import Center from "../../components/Center";
import Button from "../../components/Button";
import PlayerCard from "../../components/PlayerCard";
import bucket from "../../util/bucketResults";
import Flex from "../../components/Flex";
import Grid from "../../components/Grid";
import { Heading2 } from "../../components/Typography";
import Padding from "../../components/Padding";

interface ReviewingProps {
  room: Room;
  onReady: () => void;
}

const Reviewing = ({ room, onReady }: ReviewingProps) => {
  const [ready, setReady] = useState(false);

  const results = bucket(room.results.sort((a, b) => b.votes - a.votes));

  function readyUp() {
    setReady(true);
    onReady();
  }

  return (
    <Center flood>
      <Grid
        flood
        templateRows="clamp(300px, 1fr) 2fr 300px"
        templateColumns="100%"
      >
        <Center flood>
          <Padding>
            <Heading2 style={{ textAlign: "center" }}>{room.question}</Heading2>
          </Padding>
        </Center>
        <Flex direction="column" items="center" style={{ minHeight: 0 }} flood>
          {results.map((row, i) => (
            <Flex key={i} direction="row" justify="center" flood="x" wrap>
              {row.map((player) => (
                <PlayerCard key={player.user} score={player.votes}>
                  {room.players.find((p) => p.id === player.user)?.name}
                </PlayerCard>
              ))}
            </Flex>
          ))}
        </Flex>
        <Center flood>
          <Button
            large
            onClick={readyUp}
            disabled={ready}
            style={{ margin: 24 }}
          >
            Next Question
          </Button>
        </Center>
      </Grid>
    </Center>
  );
};

export default Reviewing;
