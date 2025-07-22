import { NoteRepository } from '@core/domain/repositories/NoteRepository';
import { UserRepository } from '@core/domain/repositories/UserRepository';
import { ApiNoteRepository } from '@infrastructure/repositories/ApiNoteRepository';
import { ApiUserRepository } from '@infrastructure/repositories/ApiUserRepository';
import { GetNotesUseCase, GetArchivedNotesUseCase, GetNoteByIdUseCase } from '@core/application/useCases/note/GetNotesUseCase';
import { CreateNoteUseCase } from '@core/application/useCases/note/CreateNoteUseCase';
import { DeleteNoteUseCase } from '@core/application/useCases/note/DeleteNoteUseCase';
import { ArchiveNoteUseCase, UnarchiveNoteUseCase } from '@core/application/useCases/note/ArchiveNoteUseCase';
import { RegisterUseCase, LoginUseCase, GetCurrentUserUseCase, LogoutUseCase } from '@core/application/useCases/auth/AuthUseCases';
import { ValidationService } from '@core/application/services/ValidationService';
import { ITokenStorage, LocalStorageTokenStorage } from '@core/application/interfaces/ITokenStorage';
import { INavigationService, BrowserNavigationService } from '@core/application/interfaces/INavigationService';

export interface DIContainerConfig {
  noteRepository?: NoteRepository;
  userRepository?: UserRepository;
  tokenStorage?: ITokenStorage;
  navigationService?: INavigationService;
  validationService?: ValidationService;
}

export class DIContainer {
  private noteRepository: NoteRepository;
  private userRepository: UserRepository;
  private tokenStorage: ITokenStorage;
  private navigationService: INavigationService;
  private validationService: ValidationService;

  // Use cases
  public getNotesUseCase: GetNotesUseCase;
  public getArchivedNotesUseCase: GetArchivedNotesUseCase;
  public getNoteByIdUseCase: GetNoteByIdUseCase;
  public createNoteUseCase: CreateNoteUseCase;
  public deleteNoteUseCase: DeleteNoteUseCase;
  public archiveNoteUseCase: ArchiveNoteUseCase;
  public unarchiveNoteUseCase: UnarchiveNoteUseCase;

  public registerUseCase: RegisterUseCase;
  public loginUseCase: LoginUseCase;
  public getCurrentUserUseCase: GetCurrentUserUseCase;
  public logoutUseCase: LogoutUseCase;

  constructor(config: DIContainerConfig = {}) {
    // Initialize dependencies with defaults or provided implementations
    this.noteRepository = config.noteRepository ?? new ApiNoteRepository();
    this.userRepository = config.userRepository ?? new ApiUserRepository();
    this.tokenStorage = config.tokenStorage ?? new LocalStorageTokenStorage();
    this.navigationService = config.navigationService ?? new BrowserNavigationService();
    this.validationService = config.validationService ?? new ValidationService();

    // Initialize note use cases
    this.getNotesUseCase = new GetNotesUseCase(this.noteRepository);
    this.getArchivedNotesUseCase = new GetArchivedNotesUseCase(this.noteRepository);
    this.getNoteByIdUseCase = new GetNoteByIdUseCase(this.noteRepository);
    this.createNoteUseCase = new CreateNoteUseCase(this.noteRepository);
    this.deleteNoteUseCase = new DeleteNoteUseCase(this.noteRepository);
    this.archiveNoteUseCase = new ArchiveNoteUseCase(this.noteRepository);
    this.unarchiveNoteUseCase = new UnarchiveNoteUseCase(this.noteRepository);

    // Initialize auth use cases
    this.registerUseCase = new RegisterUseCase(this.userRepository, this.validationService);
    this.loginUseCase = new LoginUseCase(this.userRepository, this.validationService, this.tokenStorage);
    this.getCurrentUserUseCase = new GetCurrentUserUseCase(this.userRepository);
    this.logoutUseCase = new LogoutUseCase(this.tokenStorage);
  }

  // Factory methods for easy testing and extensibility
  public static createForTesting(config: DIContainerConfig): DIContainer {
    return new DIContainer(config);
  }

  public static createDefault(): DIContainer {
    return new DIContainer();
  }
}

export const container = DIContainer.createDefault();