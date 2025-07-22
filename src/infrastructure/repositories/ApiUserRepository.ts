import { UserRepository } from '@domain/repositories/UserRepository';
import { User, RegisterRequest, LoginRequest, AuthResponse } from '@domain/entities/User';
import { apiClient } from '@infrastructure/api/apiClient';

export class ApiUserRepository implements UserRepository {
  async register(request: RegisterRequest): Promise<void> {
    await apiClient.post('/register', request);
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/login', request);
    if (!response.data) {
      throw new Error('Login failed');
    }
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    if (!response.data) {
      throw new Error('Failed to get user');
    }
    return response.data;
  }
}