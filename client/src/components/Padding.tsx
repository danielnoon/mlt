import styled, { css } from "styled-components";

interface PaddingProps {
  amount?: number;
  flood?: boolean | "x" | "y";
}

const Padding = styled.div<PaddingProps>`
  ${({ flood, amount }) =>
    flood &&
    css`
      width: ${flood === true || flood === "x"
        ? `calc(100% - ${amount}px)`
        : "unset"};
      height: ${flood === true || flood === "y"
        ? `calc(100% - ${amount}px)`
        : "unset"};
    `}

  padding: ${({ amount }) => amount ?? 24}px;
`;

export default Padding;
