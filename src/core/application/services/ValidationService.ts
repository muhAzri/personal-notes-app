import { RegisterRequest, LoginRequest } from '@core/domain/entities/User';

export class ValidationService {
  validateRegisterRequest(request: RegisterRequest): void {
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

  validateLoginRequest(request: LoginRequest): void {
    if (!request.email.trim()) {
      throw new Error('Email is required');
    }
    if (!request.password) {
      throw new Error('Password is required');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}