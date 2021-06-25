import styled from "styled-components";

const TRANSLATE = 4;

interface CodeInputProps {
  large?: boolean;
}

const CodeInput = styled.input<CodeInputProps>`
  font-size: ${(props) => (props.large ? 56 : 32)}px;
  padding: 24px 18px 18px 18px;
  background: var(--c-accent);
  color: var(--c-accent-text);
  border: none;
  border-radius: 12px;
  text-align: center;
  width: 5em;
  text-transform: uppercase;
  border-bottom: 6px solid var(--c-secondary);
  transition: 150ms ease-in-out;
  font-family: "PT Mono";
  ::placeholder {
    color: var(--c-accent-text);
    opacity: 0.75;
    text-transform: none;
  }
  &:focus {
    box-shadow: 0 0 0 ${TRANSLATE * 2}px var(--c-secondary);
    border-bottom: 6px solid var(--c-accent);
    outline: none;
  }
`;

export default CodeInput;
