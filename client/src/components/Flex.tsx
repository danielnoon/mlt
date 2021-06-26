import styled, { css } from "styled-components";

interface FlexProps {
  direction?: "row" | "column";
  flood?: boolean | "x" | "y";
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-between";
  items?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  content?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  columnGap?: number;
  rowGap?: number;
  wrap?: boolean;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ flood }) =>
    flood &&
    css`
      width: ${flood === true || flood === "x" ? "100%" : "unset"};
      height: ${flood === true || flood === "y" ? "100%" : "unset"};
    `}
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
      ${props.items ?? "initial"}
    `};
  align-content: ${(props) =>
    css`
      ${props.content ?? "initial"}
    `};
  column-gap: ${(props) =>
    css`
      ${props.columnGap ?? 0}px
    `};
  row-gap: ${(props) =>
    css`
      ${props.rowGap ?? 0}px
    `};
  flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "nowrap")};
`;

export default Flex;
