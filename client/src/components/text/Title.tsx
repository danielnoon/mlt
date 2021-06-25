import styled from "styled-components";

const Title = styled.h1`
  font-family: var(--f-heading);
  font-size: 96px;
  @media (max-width: 600px) {
    font-size: 54px;
  }
  line-height: 1.2em;
`;

export default Title;
