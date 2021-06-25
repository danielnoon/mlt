import { FC, useState } from "react";
import styled from "styled-components";
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyTwoTone";
import CheckTwoToneIcon from "@material-ui/icons/CheckTwoTone";
import Button from "./Button";

interface RoomCodeProps {
  code: string;
  className?: string;
  small?: boolean;
}

const RoomCodeBase: FC<RoomCodeProps> = ({ code, small, className }) => {
  const [copied, setCopied] = useState(false);

  async function copyRoomCode() {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        alert("Failed to copy room code.");
      }
    }
  }

  return (
    <Button color="yellow" onClick={copyRoomCode}>
      <strong className={className}>
        {code}
        {copied ? (
          <CheckTwoToneIcon fontSize={small ? "default" : "large"} />
        ) : (
          <FileCopyTwoToneIcon fontSize={small ? "default" : "large"} />
        )}
      </strong>
    </Button>
  );
};

const RoomCode = styled(RoomCodeBase)`
  font-size: ${(props) => (props.small ? "32px" : "48px")};
  line-height: 1em;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: ${(props) => (props.small ? "12px" : "24px")};
  padding: ${(props) => (props.small ? "8px 12px" : "12px 16px")};
`;

export default RoomCode;
