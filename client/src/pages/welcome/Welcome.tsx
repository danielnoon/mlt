import { useState, useEffect, KeyboardEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import ArrowForwardTwoToneIcon from "@material-ui/icons/ArrowForwardTwoTone";
import { Heading2 } from "../../components/Typography";
import Center from "../../components/Center";
import Title from "../../components/text/Title";
import Button from "../../components/Button";
import Flex from "../../components/Flex";
import Padding from "../../components/Padding";
import RoomCode from "../../components/RoomCode";
import CodeInput from "../../components/CodeInput";
import socket from "../../socket";

const Welcome = () => {
  const [page, setPage] = useState(0);
  const [roomCode, setRoomCode] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (page === 2) {
      socket.emit("new-room", (code: string) => setNewRoom(code));
    }
  }, [page]);

  function codeSubmit() {
    if (roomCode.length === 6) {
      history.push(`/play/${roomCode}`);
    }
  }

  function checkCodeSubmit(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      codeSubmit();
    }
  }

  return (
    <main style={{ height: "100%" }}>
      {page === 0 && (
        <Center flood>
          <Padding>
            <Flex direction="column">
              <Padding>
                <Title style={{ textAlign: "center" }}>
                  Who’s Most Likely To?
                </Title>
              </Padding>
              <Button large onClick={() => setPage(1)}>
                Get Started
                <ArrowForwardTwoToneIcon
                  style={{ marginLeft: 16, fontSize: 36 }}
                />
              </Button>
            </Flex>
          </Padding>
        </Center>
      )}
      {page === 1 && (
        <Center flood>
          <Padding>
            <Flex direction="column">
              <Padding>
                <Title style={{ textAlign: "center" }}>
                  Do you have a room code?
                </Title>
              </Padding>
              <Padding>
                <Flex direction="row" columnGap={48} justify="center">
                  <Button large color="green" onClick={() => setPage(3)}>
                    Yep
                  </Button>
                  <Button large color="orange" onClick={() => setPage(2)}>
                    Nope
                  </Button>
                </Flex>
              </Padding>
            </Flex>
          </Padding>
        </Center>
      )}
      {page === 2 && (
        <Center flood>
          <Padding>
            <Center>
              <Title style={{ marginBottom: 0 }}>
                Okay! Here’s your room code!
              </Title>
              <Heading2>Share it with your friends!</Heading2>
            </Center>
          </Padding>
          <RoomCode code={newRoom} />
          <Padding>
            <Flex columnGap={36}>
              <Button color="orange" large onClick={() => setPage(1)}>
                Go Back
              </Button>
              <Link to={`/play/${newRoom}`} style={{ textDecoration: "none" }}>
                <Button color="green" large>
                  Continue
                </Button>
              </Link>
            </Flex>
          </Padding>
        </Center>
      )}
      {page === 3 && (
        <Center flood>
          <Padding>
            <Title style={{ margin: 0 }}>Enter your room code here:</Title>
          </Padding>
          <CodeInput
            onChange={(ev) => setRoomCode(ev.target.value.toUpperCase())}
            value={roomCode}
            large
            autoFocus
            maxLength={6}
            onKeyPress={checkCodeSubmit}
          />
          <Padding>
            <Flex columnGap={36}>
              <Button large onClick={() => setPage(1)} color="orange">
                Go Back
              </Button>
              <Button
                large
                color="green"
                disabled={roomCode.length < 6}
                onClick={codeSubmit}
              >
                Continue
              </Button>
            </Flex>
          </Padding>
        </Center>
      )}
    </main>
  );
};

export default Welcome;
