import styled from "styled-components";

const Question = styled.div`
  font-size: 48px;
  width: calc(100% - 160px);
  max-width: 720px;
  line-height: 1.4em;
  text-align: center;
  padding: 50px;
  border-radius: 12px;
  border: 2px solid var(--c-text);
  font-family: var(--f-heading);
  @media (max-width: 800px) {
    font-size: 32px;
  }
  @media (max-width: 400px) {
    font-size: 24px;
  }
`;

export default Question;
