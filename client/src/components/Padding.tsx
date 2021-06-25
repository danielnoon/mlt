import styled, { css } from "styled-components";

interface PaddingProps {
  amount?: number;
  flood?: boolean;
}

const Padding = styled.div<PaddingProps>`
  ${(props) =>
    props.flood &&
    css`
      width: 100%;
      height: 100%;
    `}

  padding: ${(props) => props.amount ?? 24}px;
`;

export default Padding;
