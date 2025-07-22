import { User, RegisterRequest, LoginRequest, AuthResponse } from '@core/domain/entities/User';

export interface UserRepository {
  register(request: RegisterRequest): Promise<void>;
  login(request: LoginRequest): Promise<AuthResponse>;
  getCurrentUser(): Promise<User>;
}