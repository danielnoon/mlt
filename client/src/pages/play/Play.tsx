import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket";
import Button from "../../components/Button";
import Grid from "../../components/Grid";
import GridItem from "../../components/GridItem";
import Input from "../../components/Input";
import Title from "../../components/text/Title";
import { Room } from "./types";
import Joining from "./Joining";
import Flex from "../../components/Flex";
import Center from "../../components/Center";
import Padding from "../../components/Padding";
import { Done, ExitToApp } from "@material-ui/icons";
import { Heading1, Heading2 } from "../../components/Typography";
import RoomCode from "../../components/RoomCode";
import Players from "./Players";

const Play = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState<Room | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const { code } = useParams<{ code: string }>();

  console.log(room);

  useEffect(() => {
    socket.on("update-room", (room) => setRoom(room));
    socket.on("show-answers", (answers) => setAnswers(answers));
  }, []);

  function join() {
    socket.emit("join-room", code, name, (room: Room) => setRoom(room));
  }

  function ready() {
    socket.emit("ready");
  }

  function select(player: string) {
    socket.emit("submit", player);
  }

  if (!room) {
    return (
      <Center flood>
        <Flex direction="column" rowGap={48}>
          <Input
            placeholder="Username"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <Center>
            <Button large onClick={join}>
              Join <ExitToApp style={{ marginLeft: 12, fontSize: 38 }} />
            </Button>
          </Center>
        </Flex>
      </Center>
    );
  }

  return (
    <Grid
      flood
      templateColumns="300px 1fr 300px"
      templateRows="120px 1fr"
      areas={["title title title", "main main right"]}
    >
      <GridItem area="title">
        <Flex style={{ padding: "0 32px" }} justify="space-between">
          <Heading1>Who's Most Likely To?</Heading1>
          <Center>
            <RoomCode small code={code} />
          </Center>
        </Flex>
      </GridItem>
      <GridItem area="right">
        <Players room={room} />
      </GridItem>
      <GridItem area="main">
        {room.state === "joining" && <Joining room={room} onReady={ready} />}
        {room.state === "deliberating" && (
          <div>
            <Title>{room.question}</Title>
            <div>
              {room.players.map((player) => (
                <Button key={player.id} onClick={() => select(player.id)}>
                  {player.name}
                </Button>
              ))}
            </div>
          </div>
        )}
        {room.state === "reviewing" && (
          <div>
            <ul>
              {answers.map((ans, i) => (
                <li key={i}>{ans}</li>
              ))}
            </ul>
            <Button large onClick={ready}>
              Ready
            </Button>
          </div>
        )}
      </GridItem>
    </Grid>
  );
};

export default Play;
