import { User, RegisterRequest, LoginRequest, AuthResponse } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: RegisterRequest): Promise<void> {
    this.validateRegisterRequest(request);
    return this.userRepository.register(request);
  }

  private validateRegisterRequest(request: RegisterRequest): void {
    if (!request.name.trim()) {
      throw new Error('Name is required');
    }
    if (!request.email.trim()) {
      throw new Error('Email is required');
    }
    if (!this.isValidEmail(request.email)) {
      throw new Error('Invalid email format');
    }
    if (!request.password) {
      throw new Error('Password is required');
    }
    if (request.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: LoginRequest): Promise<AuthResponse> {
    this.validateLoginRequest(request);
    const response = await this.userRepository.login(request);
    
    localStorage.setItem('accessToken', response.accessToken);
    
    return response;
  }

  private validateLoginRequest(request: LoginRequest): void {
    if (!request.email.trim()) {
      throw new Error('Email is required');
    }
    if (!request.password) {
      throw new Error('Password is required');
    }
  }
}

export class GetCurrentUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User> {
    return this.userRepository.getCurrentUser();
  }
}

export class LogoutUseCase {
  async execute(): Promise<void> {
    localStorage.removeItem('accessToken');
  }
}