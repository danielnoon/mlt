import styled, { css } from "styled-components";

interface ButtonProps {
  large?: boolean;
  color?: "accent" | "secondary" | "orange" | "green" | "yellow";
}

const X_TRANSLATE = 8;
const Y_TRANSLATE = 6;

function getFontStyles(props: ButtonProps) {
  if (props.large) {
    return css`
      padding: 24px 32px;
      font-size: 36px;
      @media (max-width: 600px) {
        font-size: 24px;
      }
      @media (max-width: 400px) {
        font-size: 18px;
      }
    `;
  } else {
    return css`
      padding: 12px 16px;
      font-size: 16px;
    `;
  }
}

function getColorStyles(props: ButtonProps) {
  if (!props.color || props.color === "accent") {
    return css`
      background-color: var(--c-accent);
      color: var(--c-accent-text);
      box-shadow: 0 0 0 0 var(--c-secondary);
      &:hover,
      &:focus {
        box-shadow: ${X_TRANSLATE * 2}px ${Y_TRANSLATE * 2}px 0 0
          var(--c-secondary);
      }
    `;
  } else if (props.color === "secondary") {
    return css`
      background-color: var(--c-secondary);
      color: var(--c-secondary-text);
      box-shadow: 0 0 0 0 var(--c-accent);
      &:hover,
      &:focus {
        box-shadow: ${X_TRANSLATE * 2}px ${Y_TRANSLATE * 2}px 0 0
          var(--c-accent);
      }
    `;
  } else if (props.color === "yellow") {
    return css`
      background-color: var(--c-accent-yellow);
      color: var(--c-accent-yellow-text);
      box-shadow: 0 0 0 0 var(--c-accent);
      &:hover,
      &:focus {
        box-shadow: ${X_TRANSLATE * 2}px ${Y_TRANSLATE * 2}px 0 0
          var(--c-accent);
      }
    `;
  } else {
    return css`
      background-color: var(--c-accent-${props.color});
      color: var(--c-accent-${props.color}-text);
      box-shadow: 0 0 0 0 var(--c-accent-yellow);
      &:hover,
      &:focus {
        box-shadow: ${X_TRANSLATE * 2}px ${Y_TRANSLATE * 2}px 0 0
          var(--c-accent-yellow);
      }
    `;
  }
}

const Button = styled.button<ButtonProps>`
  ${getColorStyles}
  ${getFontStyles}
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  text-transform: uppercase;
  outline: none;
  border: none;
  font-family: var(--f-body);
  font-weight: 800;
  cursor: pointer;
  transition: 150ms ease-in-out;
  text-decoration: none;
  &:hover,
  &:focus {
    transform: translate(${-X_TRANSLATE}px, ${-Y_TRANSLATE}px);
  }
  &:disabled,
  &[disabled] {
    color: var(--c-text);
    background-color: var(--c-bg);
    cursor: disabled;
    &:hover,
    &:focus {
      transform: translate(0, 0);
      box-shadow: 0 0 0 0 var(--c-background);
    }
  }
`;

export default Button;
