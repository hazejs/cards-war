import React, { useEffect, useReducer, useRef } from 'react';
import { Button, CardImage, CardsContainer, Container, FloatingContainer, GameActionButtons, InnerCardsContainer, InnerCardsWrapper, PlayerDeck, PlayerDecksContainer, StackedCard, TitleWrapper, Wrapper } from './styles';
import { initialState, reducer } from './reducer';

const CardGameApp: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    deckId,
    player1Card,
    player2Card,
    player1Wins,
    player2Wins,
    cardsRemaining,
    player1Deck,
    player2Deck,
    winner,
    tie
  } = state;

  const isTieRendered = useRef(false);

  useEffect(() => {
    if(tie && !isTieRendered.current) {
      reshuffle()
      isTieRendered.current = true;
    } 
  }, [tie])

  const fetchNewDeck = async () => {
    const response = await fetch(
      'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );
    const data = await response.json();
    dispatch({ type: 'SET_DECK_ID', deckId: data.deck_id });
  };

  const drawCard = async () => {
    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    );
    const data = await response.json();
    dispatch({ type: 'DRAW_CARD', data });
  };
  
  const reshuffle = async () => {
    const returnToDeckResponse = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/return/?cards=${player1Card?.code},${player2Card?.code}`
    );
  
    const reshuffleResponse = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`
    );

    const returnToDeckData = await returnToDeckResponse.json();
    const reshuffleData = await reshuffleResponse.json();
    dispatch({ type: 'RESHUFFLE', res: {returnToDeckData, reshuffleData} });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <h1>Card Game</h1>
      </TitleWrapper>
     
      <Container>
        <GameActionButtons>
          {deckId && 
            <div>
              <Button onClick={drawCard}>Draw Card</Button>
              <Button  onClick={resetGame}>Restart Game</Button>
            </div>    
          }
        </GameActionButtons>
        <PlayerDecksContainer>
          <div>
            <h1>Player 1</h1>
            <PlayerDeck>
              {player1Deck.map((card, index) => (
                <StackedCard
                  key={index}
                  index={index}
                  src={card.image}
                  alt={`${card.value} of ${card.suit}`}
                />
              ))}
            </PlayerDeck>
          </div>
          <div>
            <h1>Player 2</h1>
            <PlayerDeck>
              {player2Deck.map((card, index) => (
                <StackedCard
                  key={index}
                  index={index}
                  src={card.image}
                  alt={`${card.value} of ${card.suit}`}
                />
              ))}
            </PlayerDeck>
          </div>
        </PlayerDecksContainer>
        
        <CardsContainer>
          {!deckId ? (
            <Button onClick={fetchNewDeck}>Start Game</Button>
          ) : (
            <InnerCardsWrapper>
              <InnerCardsContainer>
                <div>
                  <h2>Player 1 Card:</h2>
                  {player1Card && (
                    <CardImage
                      src={player1Card.image}
                      alt={`${player1Card.value} of ${player1Card.suit}`}
                    />
                  )}
                </div>
                <div>
                  <h2>Player 2 Card:</h2>
                  {player2Card && (
                    <CardImage
                      src={player2Card.image}
                      alt={`${player2Card.value} of ${player2Card.suit}`}
                    />
                  )}
                </div>
              </InnerCardsContainer>
            </InnerCardsWrapper>
          )}
        </CardsContainer>
      </Container>

      <FloatingContainer>
        <h2>Player 1 Wins: {player1Wins}</h2>
        <h2>Player 2 Wins: {player2Wins}</h2>
        <div>
          {winner && <h2>Winner: {winner}</h2>}
          {cardsRemaining === 0 && (
            <h2>Total Winner: {player1Wins === player2Wins ? 'Tie'
              : player1Wins > player2Wins ? 'Player 1' : 'Player 2'}</h2>
          )}
        </div>
      </FloatingContainer>
    </Wrapper>
      );
};

export default CardGameApp;
