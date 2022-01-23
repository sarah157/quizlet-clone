import api from "./api"

export const getUserDecks = (username) => {
    return api.get(`/decks?username=${username}`);
}
export const createDeck = (data) => {
    return api.post("/decks", data);
}
export const reorderDeckCard = (cardId, index) => {
    return api.put(`/decks/reorder-card`, {cardId, index});
}
export const getDeck = (id) => {
    return api.get(`/decks/${id}`);
}
export const updateDeck = (id) => {
    return api.patch(`/decks/${id}`);
}
export const deleteDeck = (id) => {
    return api.delete(`/decks/${id}`);
}