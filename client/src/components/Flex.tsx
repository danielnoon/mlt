import styled, { css } from "styled-components";

interface FlexProps {
  direction?: "row" | "column";
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-between";
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  columnGap?: number;
  rowGap?: number;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) =>
    css`
      ${props.direction ?? "row"}
    `};
  justify-content: ${(props) =>
    css`
      ${props.justify ?? "initial"}
    `};
  align-items: ${(props) =>
    css`
      ${props.align ?? "initial"}
    `};
  column-gap: ${(props) =>
    css`
      ${props.columnGap ?? 0}px
    `};
  row-gap: ${(props) =>
    css`
      ${props.rowGap ?? 0}px
    `};
`;

export default Flex;
