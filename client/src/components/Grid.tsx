import styled, { css } from "styled-components";

interface GridProps {
  columnGap?: number;
  rowGap?: number;
  templateColumns?: string;
  templateRows?: string;
  areas?: string[];
  flood?: boolean;
}

const Grid = styled.div<GridProps>`
  ${(props) =>
    props.flood &&
    css`
      width: 100%;
      height: 100%;
    `}
  display: grid;
  grid-template-columns: ${(props) => props.templateColumns};
  grid-template-rows: ${(props) => props.templateRows};
  grid-template-areas: ${(props) =>
    props.areas && props.areas.map((a) => `"${a}"`).join(" ")};
  column-gap: ${(props) => `
      ${props.columnGap ?? 0}px
    `};
  row-gap: ${(props) => `
      ${props.rowGap ?? 0}px
    `};
`;

export default Grid;
