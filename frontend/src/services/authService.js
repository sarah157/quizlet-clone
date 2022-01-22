import api from "./api"

export const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", res.data.token)
    return res.data.user
}

export const register = async (email, username, password) => {
    const res = await api.post("/auth/register", { email, username, password });
    localStorage.setItem("token", res.data.token)
    return res.data.user
}

export const logout = async () => {
    localStorage.removeItem("token");
}