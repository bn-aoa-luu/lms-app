export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  thumbnail: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (cred: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}