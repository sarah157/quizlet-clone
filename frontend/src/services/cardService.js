import api from "./api"

export const createCard = (data) => {
    return api.post(`cards`, data);
}
export const updateCard = (cardId) => {
    return api.patch(`cards/${cardId}`);
}
export const deleteCard = (cardId) => {
    return api.delete(`cards/${cardId}`);
}
export const getCardStar = (cardId) => {
    return api.get(`cards/${cardId}/star`);
}
export const starCard = (cardId) => {
    return api.put(`cards/${cardId}/star`);
}
export const unstarCard = (cardId) => {
    return api.delete(`cards/${cardId}/star`);
}