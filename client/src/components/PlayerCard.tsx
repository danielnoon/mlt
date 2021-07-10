import styled from "styled-components";

interface PlayerCardProps {
  score: number;
}

function getScale(s: number) {
  return 1 + (s * 1) / 10;
}

const PlayerCard = styled.div<PlayerCardProps>`
  padding: ${({ score }) => 24 * getScale(score)}px
    ${({ score }) => 36 * getScale(score)}px;
  border: 2px solid var(--c-text);
  background-color: var(--c-secondary);
  color: var(--c-secondary-text);
  text-align: center;
  border-radius: 8px;
  margin: ${({ score }) => 20 * getScale(score)}px;
  font-weight: 700;
  display: flex;
  font-size: ${({ score }) => 1.75 * getScale(score)}rem;
  justify-content: flex-start;
  align-items: center;
  align-content: center;

  &::before {
    display: inline-flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--c-secondary-text);
    content: "${({ score }) => score.toString()}";
    width: 1.5em;
    height: 1.5em;
    margin-right: ${({ score }) => 24 * getScale(score)}px;
    padding: ${({ score }) => 8 * getScale(score)}px;
    border-radius: 2em;
    background-color: var(--c-accent);
  }
`;

export default PlayerCard;
