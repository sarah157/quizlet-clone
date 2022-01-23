import api from "./api"

export const createCard = (data, deckId) => {
    return api.post(`decks/${deckId}/cards`, data);
}
export const updateCard = (cardId, deckId) => {
    return api.patch(`decks/${deckId}/cards/${cardId}`);
}
export const deleteCard = (cardId, deckId) => {
    return api.delete(`decks/${deckId}/cards/${cardId}`);
}
export const unstarCard = (cardId, deckId) => {
    return api.delete(`decks/${deckId}/cards/${cardId}/star`);
}