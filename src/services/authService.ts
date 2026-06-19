import { api } from "@/lib/api";

export const authService = {
  login: async (email: string, password: string): Promise<string> => {
    const { data } = await api.post("/login", { email, password });
    localStorage.setItem("token", data.token);
    return data.token;
  },
};