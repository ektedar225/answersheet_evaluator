import { create } from 'zustand';
import { User, UserRole } from '../types';

// Mock users for demo purposes
const mockUsers = [
  {
    id: '1',
    name: 'Ashish Pathak',
    email: 'ashishpathak@gmail.com',
    role: 'teacher' as UserRole,
    password: 'answer123',
  },
  {
    id: '2',
    name: 'Ektedar',
    email: 'ektedar5100@gmail.com',
    role: 'student' as UserRole,
    password: 'password123',
  },
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = mockUsers.find(
        (user) => user.email === email && user.password === password
      );
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        set({
          user: userWithoutPassword,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ error: 'Invalid email or password', isLoading: false });
      }
    } catch (error) {
      set({ error: 'An error occurred during login', isLoading: false });
    }
  },

  register: async (name, email, password, role) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (mockUsers.some((user) => user.email === email)) {
        set({ error: 'Email already exists', isLoading: false });
        return;
      }
      
      const newUser = {
        id: `${mockUsers.length + 1}`,
        name,
        email,
        role,
      };
      
      // In a real app, we would save this to a database
      mockUsers.push({ ...newUser, password });
      
      set({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'An error occurred during registration', isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));