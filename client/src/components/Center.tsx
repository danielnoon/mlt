import styled, { css } from "styled-components";

interface CenterProps {
  flood?: boolean;
}

const Center = styled.div<CenterProps>`
  ${(props) =>
    props.flood &&
    css`
      width: 100%;
      height: 100%;
    `}

  display: grid;
  place-items: center;
`;

export default Center;
