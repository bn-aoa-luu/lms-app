export interface Course {
  id: string | number;
  title: string;
  category: string;
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
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}