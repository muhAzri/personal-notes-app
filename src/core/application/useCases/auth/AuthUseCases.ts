import { User, RegisterRequest, LoginRequest, AuthResponse } from '@core/domain/entities/User';
import { UserRepository } from '@core/domain/repositories/UserRepository';
import { ValidationService } from '@core/application/services/ValidationService';
import { ITokenStorage } from '@core/application/interfaces/ITokenStorage';

export class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private validationService: ValidationService
  ) {}

  async execute(request: RegisterRequest): Promise<void> {
    this.validationService.validateRegisterRequest(request);
    return this.userRepository.register(request);
  }
}

export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private validationService: ValidationService,
    private tokenStorage: ITokenStorage
  ) {}

  async execute(request: LoginRequest): Promise<AuthResponse> {
    this.validationService.validateLoginRequest(request);
    const response = await this.userRepository.login(request);
    
    this.tokenStorage.setToken(response.accessToken);
    
    return response;
  }
}

export class GetCurrentUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User> {
    return this.userRepository.getCurrentUser();
  }
}

export class LogoutUseCase {
  constructor(private tokenStorage: ITokenStorage) {}

  execute(): void {
    this.tokenStorage.removeToken();
  }
}