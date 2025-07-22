import { ApiNoteRepository } from '@infrastructure/repositories/ApiNoteRepository';
import { ApiUserRepository } from '@infrastructure/repositories/ApiUserRepository';
import { GetNotesUseCase, GetArchivedNotesUseCase, GetNoteByIdUseCase } from '@application/useCases/note/GetNotesUseCase';
import { CreateNoteUseCase } from '@application/useCases/note/CreateNoteUseCase';
import { DeleteNoteUseCase } from '@application/useCases/note/DeleteNoteUseCase';
import { ArchiveNoteUseCase, UnarchiveNoteUseCase } from '@application/useCases/note/ArchiveNoteUseCase';
import { RegisterUseCase, LoginUseCase, GetCurrentUserUseCase, LogoutUseCase } from '@application/useCases/auth/AuthUseCases';

class DIContainer {
  private noteRepository = new ApiNoteRepository();
  private userRepository = new ApiUserRepository();

  getNotesUseCase = new GetNotesUseCase(this.noteRepository);
  getArchivedNotesUseCase = new GetArchivedNotesUseCase(this.noteRepository);
  getNoteByIdUseCase = new GetNoteByIdUseCase(this.noteRepository);
  createNoteUseCase = new CreateNoteUseCase(this.noteRepository);
  deleteNoteUseCase = new DeleteNoteUseCase(this.noteRepository);
  archiveNoteUseCase = new ArchiveNoteUseCase(this.noteRepository);
  unarchiveNoteUseCase = new UnarchiveNoteUseCase(this.noteRepository);

  registerUseCase = new RegisterUseCase(this.userRepository);
  loginUseCase = new LoginUseCase(this.userRepository);
  getCurrentUserUseCase = new GetCurrentUserUseCase(this.userRepository);
  logoutUseCase = new LogoutUseCase();
}

export const container = new DIContainer();