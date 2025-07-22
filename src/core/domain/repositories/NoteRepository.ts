import { NoteReadRepository } from './NoteReadRepository';
import { NoteWriteRepository } from './NoteWriteRepository';

// Combined interface for backward compatibility
export interface NoteRepository extends NoteReadRepository, NoteWriteRepository {}