import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import socket from "../../socket";
import Button from "../../components/Button";
import Grid from "../../components/Grid";
import GridItem from "../../components/GridItem";
import Input from "../../components/Input";
import { Room, Ack } from "mlt-types";
import Joining from "./Joining";
import Flex from "../../components/Flex";
import Center from "../../components/Center";
import { Heading1 } from "../../components/Typography";
import RoomCode from "../../components/RoomCode";
import Players from "./Players";
import Deliberating from "./Deliberating";
import Reviewing from "./Reviewing";
import useDesktop from "../../hooks/useDesktop";
import { ExitToApp } from "@material-ui/icons";
import checkEnter from "../../util/checkEnter";

const Play = () => {
  const { code } = useParams<{ code: string }>();
  const [name, setName] = useState("");
  const [room, setRoom] = useState<Room | null>(null);
  const [token, setToken] = useState("");
  const desktop = useDesktop();
  const history = useHistory();

  useEffect(() => {
    const onUpdate = (room: Room) => setRoom(room);

    socket.on("update-room", onUpdate);

    return () => {
      socket.off("update-room", onUpdate);
    };
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      socket.emit("rejoin", token, ({ data, error }: Ack<Room>) => {
        if (!error) {
          setRoom(data);
        } else {
          sessionStorage.clear();
          setRoom(null);
        }
      });
    }
  }, []);

  function chooseUsername() {
    if (name.length > 0) join();
  }

  function join() {
    socket.emit(
      "join-room",
      code,
      name,
      ({ data, error }: Ack<{ room: Room; token: string }>) => {
        if (!error && data) {
          setRoom(data.room);
          setToken(data.token);
          sessionStorage.setItem("token", data.token);
        } else {
          alert("Error! " + error);
        }
      }
    );
  }

  function ready() {
    socket.emit("ready", token, ({ error }: Ack<null>) => {
      if (error) {
        alert(error);
        setRoom(null);
      }
    });
  }

  function select(player: string) {
    socket.emit("submit", token, player);
  }

  function logout() {
    sessionStorage.clear();
    history.push("/");
  }

  if (!room) {
    return (
      <Center flood>
        <div style={{ maxWidth: "100vw" }}>
          <Flex direction="column" rowGap={48}>
            <Input
              placeholder="Username"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              onKeyPress={checkEnter(chooseUsername)}
            />
            <Center>
              <Button large onClick={chooseUsername} color="green">
                Join
              </Button>
            </Center>
          </Flex>
        </div>
      </Center>
    );
  }

  return (
    <Grid
      flood
      templateColumns={desktop ? "300px 1fr 300px" : "100%"}
      templateRows="120px 1fr"
      areas={
        desktop ? ["title title title", "main main right"] : ["title", "main"]
      }
    >
      <GridItem area="title">
        <Flex
          flood="y"
          style={{ padding: desktop ? "0 32px" : "0 24px" }}
          justify={desktop ? "space-between" : "flex-end"}
        >
          {desktop && <Heading1>Who's Most Likely To?</Heading1>}
          <Center>
            <Flex direction="row" columnGap={24}>
              <RoomCode small code={code} />
              <Button large color="accent">
                <ExitToApp fontSize="large" onClick={logout} />
              </Button>
            </Flex>
          </Center>
        </Flex>
      </GridItem>
      {desktop && (
        <GridItem area="right">
          <Players room={room} />
        </GridItem>
      )}
      <GridItem area="main">
        {room.state === "joining" && <Joining room={room} onReady={ready} />}
        {room.state === "deliberating" && (
          <Deliberating room={room} onSelect={select} />
        )}
        {room.state === "reviewing" && (
          <Reviewing room={room} onReady={ready} />
        )}
      </GridItem>
    </Grid>
  );
};

export default Play;
