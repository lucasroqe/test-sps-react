import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
                                        // coloca no cabeçalho
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// desloga usuário se o back voltar 401
api.interceptors.response.use((res) => res, (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);