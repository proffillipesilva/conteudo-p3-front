import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const setupInterceptors = (showSuccess, showError) => {
    api.interceptors.response.use( (response) => {
    if (['post', 'put', 'delete'].includes(response.config.method)) {
        showSuccess();
      }
      return response;
    },
    (error) => {
        showError();
        return Promise.reject(error);
    })
}

export default api;