import { api } from "@/lib/api";

export interface User {
  id: number;
  name: string;
  email: string;
  type: "admin" | "user";
}

export interface UserPayload {
  name: string;
  email: string;
  type: "admin" | "user";
  password?: string;
}

export const userService = {
  list: async (): Promise<User[]> => {
    const { data } = await api.get("/users");
    return data;
  },

  get: async (id: string): Promise<User | undefined> => {
    const { data } = await api.get<User[]>("/users");
    return data.find((u) => String(u.id) === id);
  },

  create: async (payload: UserPayload): Promise<void> => {
    await api.post("/users", payload);
  },

  update: async (id: string, payload: Omit<UserPayload, "password">): Promise<void> => {
    await api.put(`/users/${id}`, payload);
  },
  
  remove: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
