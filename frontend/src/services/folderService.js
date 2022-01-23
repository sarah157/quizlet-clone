import api from "./api"

export const createFolder = (data) => {
    return api.post(`/folders`, data);
}
export const updateFolder = (id, data) => {
    return api.patch(`folders/${id}`, data);
}
export const deleteFolder = (id) => {
    return api.delete(`folders/${id}`);
}