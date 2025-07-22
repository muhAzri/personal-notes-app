import { UserRepository } from '@core/domain/repositories/UserRepository';
import { User, RegisterRequest, LoginRequest, AuthResponse } from '@core/domain/entities/User';
import { apiClient } from '@infrastructure/api/apiClientInstance';

export class ApiUserRepository implements UserRepository {
  async register(request: RegisterRequest): Promise<void> {
    await apiClient.post('/register', request);
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<{ accessToken: string }>('/login', request);
    if (!response.data) {
      throw new Error('Login failed');
    }
    return {
      accessToken: response.data.accessToken
    };
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    if (!response.data) {
      throw new Error('Failed to get user');
    }
    return response.data;
  }
}