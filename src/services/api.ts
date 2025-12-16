import axios from 'axios';
import { Course, LoginCredentials } from '@/types/course';

const BASE_URL = 'https://6938e7e24618a71d77d19513.mockapi.io/api/v1/course';

export const courseAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    level?: string;
  }) => {
    const response = await axios.get<Course[]>(BASE_URL, { params });
    return response.data;
  },

  getById: async (id: string | number) => {
    const response = await axios.get<Course>(`${BASE_URL}/${id}`);
    return response.data;
  },

  create: async (data: Omit<Course, 'id'>) => {
    const response = await axios.post<Course>(BASE_URL, data);
    return response.data;
  },

  update: async (id: string | number, data: Partial<Course>) => {
    const response = await axios.patch<Course>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id: string | number) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export const authAPI = {
  login: async (
    credentials: LoginCredentials
  ): Promise<{ token: string; user: any }> => {
    // fake delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      emailRegex.test(credentials.email) &&
      credentials.password.length >= 6
    ) {
      return {
        token: 'fake-jwt-token-' + Date.now(),
        user: {
          email: credentials.email,
          name: credentials.email.split('@')[0],
        },
      };
    }

    throw new Error('Invalid email or password');
  },
};
