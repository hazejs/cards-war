import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex: 0.5;
  text-align: center;
`;

export const InnerCardsWrapper = styled.div`
    display: flex;
    width: 100%;
`;

export const FloatingContainer = styled.div`
    position: fixed;
    bottom: 50px;
    left: 50px;
`;

export const InnerCardsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 150px;
`;

export const CardImage = styled.img`
  width: 85px;
  height: auto;
  margin: 5px;
`;

export const PlayerDeck = styled.div`
  position: relative;
  margin-top: 20px;
`;

export const PlayerDecksContainer = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: space-evenly;
`;

export const GameActionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.2;
  padding: 0 20px;
  flex-direction: column;
`;

export const StackedCard = styled(CardImage)<{ index: number }>`
  position: absolute;
  top: ${(props) => props.index * 20}px;
  left: 0;
`;