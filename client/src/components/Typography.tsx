import styled from "styled-components";

const Heading1 = styled.h1`
  font-family: Balsamiq Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 1.15em;
  color: var(--c-text);
`;

const Heading2 = styled.h2`
  font-family: Balsamiq Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  @media (max-width: 600px) {
    font-size: 32px;
  }
  line-height: 1.15em;
  color: var(--c-text);
`;

export { Heading1, Heading2 };
