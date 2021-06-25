import styled from "styled-components";

interface GridProps {
  area?: string;
}

const Grid = styled.div<GridProps>`
  display: block;
  grid-area: ${(props) => props.area};
`;

export default Grid;
