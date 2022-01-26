import api from "./api"

export const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data))
    return res.data.user
}
export const register = async (email, username, password) => {
    const res = await api.post("/auth/register", { email, username, password });
    localStorage.setItem("user", JSON.stringify(res.data))
    return res.data.user
}
export const logout = async () => {
    localStorage.removeItem("user")
}
export const getCurrentUser = () => {
    const user = localStorage.getItem("user")
    return JSON.parse(user);
}