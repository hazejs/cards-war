import { mapCardValueToNumber } from "./utils";

interface Card {
    code: string;
    image: string;
    value: string;
    suit: string;
} 

interface GameState {
    deckId: string;
    player1Card: Card | null;
    player2Card: Card | null;
    player1Wins: number;
    player2Wins: number;
    cardsRemaining: number;
    player1Deck: Card[];
    player2Deck: Card[];
    winner: string | null;
    tie: boolean;
}
  
type Action =
    | { type: 'SET_DECK_ID'; deckId: string }
    | { type: 'DRAW_CARD'; data: any }
    | { type: 'RESHUFFLE'; res: any}
    | { type: 'RESET_GAME' };
  
export const initialState: GameState = {
    deckId: '',
    player1Card: null,
    player2Card: null,
    player1Wins: 0,
    player2Wins: 0,
    cardsRemaining: -1,
    player1Deck: [],
    player2Deck: [],
    winner: null,
    tie: false,
};

export const reducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'SET_DECK_ID':
            return { ...state, deckId: action.deckId };
        case 'RESHUFFLE':
            const { res } = action;   
            const updatedCardsRemaining = res.remaining;
            return {
                ...state,
                tie: false,
                cardsRemaining: updatedCardsRemaining,
            };
        case 'DRAW_CARD':
            const { data } = action;
            console.log('data', data);
            
            if (data.success) {
            const card1 = data.cards[0];
            const card2 = data.cards[1];
            const updatedCardsRemaining = data.remaining;
            if (card1 && card2) {
                const card1Value = mapCardValueToNumber(card1.value);
                const card2Value = mapCardValueToNumber(card2.value);
                if (card1Value > card2Value) {
                    return {
                        ...state,
                        player1Card: card1,
                        player2Card: card2,
                        player1Wins: state.player1Wins + 1,
                        player1Deck: [...state.player1Deck, card1, card2],
                        winner: 'Player 1',
                        cardsRemaining: updatedCardsRemaining,
                    };
                } else if (card1Value < card2Value) {
                    return {
                        ...state,
                        player1Card: card1,
                        player2Card: card2,
                        player2Wins: state.player2Wins + 1,
                        player2Deck: [...state.player2Deck, card1, card2],
                        winner: 'Player 2',
                        cardsRemaining: updatedCardsRemaining,
                    };
                } else {
                    return {
                        ...state,
                        tie: true,
                        player1Card: card1,
                        player2Card: card2,
                        player1Deck: [...state.player1Deck],
                        player2Deck: [...state.player2Deck],
                        winner: null,
                        cardsRemaining: updatedCardsRemaining,
                    };
                }
            }
          } else {
            console.error('Error drawing cards:', data);
          }

            return state;
  
        case 'RESET_GAME':
            return initialState;

        default:
            return state;
    }
};
  