import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // coloca no cabeçalho que tem o bearer padrão
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// desloga usuário se o back voltar 401
api.interceptors.response.use((res) => res, (error) => {
  const isLogin = error.config?.url?.includes("/login");

  if (error.response?.status === 401 && !isLogin) {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  }

  return Promise.reject(error);
}
);