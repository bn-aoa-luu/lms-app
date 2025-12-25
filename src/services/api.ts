import axios from 'axios';
import { Course, LoginCredentials } from '@/types/course';

const BASE_URL = 'https://6938e7e24618a71d77d19513.mockapi.io/api/v1/course';

export const courseAPI = {
  getAll: async (params?: any) => {
    const res = await axios.get<Course[]>(BASE_URL, { params });
    return res.data;
  },

  getById: async (id: string) => {
    const res = await axios.get<Course>(`${BASE_URL}/${id}`);
    return res.data;
  },

  create: async (data: Omit<Course, 'id'>) => {
    const res = await axios.post<Course>(BASE_URL, data);
    return res.data;
  },

  update: async (id: string, data: Partial<Course>) => {
    const res = await axios.put<Course>(`${BASE_URL}/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  },
};

export const authAPI = {
  login: async (
    credentials: LoginCredentials
  ): Promise<{ token: string; user: any }> => {
    await new Promise((r) => setTimeout(r, 800));

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (validEmail.test(credentials.email) && credentials.password.length >= 6) {
      return {
        token: 'fake-jwt-' + Date.now(),
        user: {
          email: credentials.email,
        },
      };
    }
    throw new Error('Invalid email or password');
  },
};
