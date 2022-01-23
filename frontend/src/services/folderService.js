import api from "./api"

export const getUserFolders = (username) => {
    return api.get(`/folders?username=${username}`);
}
export const createFolder = (data) => {
    return api.post(`/folders`, data);
}
export const getFolder = (id) => {
    return api.get(`folders/${id}`);
}
export const updateFolder = (id, data) => {
    return api.patch(`folders/${id}`, data);
}
export const deleteFolder = (id) => {
    return api.delete(`folders/${id}`);
}
export const addDeckToFolder = (id, deckId) => {
    return api.post(`folders/${id}/decks`);
}
export const removeDeckFromFolder = (id, deckId) => {
    return api.delete(`folders/${id}/decks/${deckId}`);
}