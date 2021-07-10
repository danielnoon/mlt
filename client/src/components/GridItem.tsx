import styled from "styled-components";

interface GridItemProps {
  area?: string;
}

const GridItem = styled.div<GridItemProps>`
  display: block;
  grid-area: ${(props) => props.area};
  min-height: 0;
  min-width: 0;
  overflow: auto;
`;

export default GridItem;
