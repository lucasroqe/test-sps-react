import { api } from "@/lib/api";

export const authService = {
  login: async (email: string, password: string): Promise<string> => {
    const { data } = await api.post("/login", { email, password });
    return data.token;
  },
};