import axios from 'axios'

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:3005',
    headers: {
        'content-type':'application/json',
    },
});

  // Set the AUTH token for any request
api.interceptors.request.use(function (config) {
    const user = localStorage.getItem('user');
    config.headers.Authorization =  user ? `Bearer ${JSON.parse(user).token}` : '';
    return config;
});
  
export default api