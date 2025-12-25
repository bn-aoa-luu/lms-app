export interface Course {
  id: string | number;
  title: string;
  category: string;
  numberOfLesson: number;
  level: string;
  description: string;
  thumbnail: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => void;
}
