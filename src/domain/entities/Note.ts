export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
  owner: string;
}

export interface CreateNoteRequest {
  title: string;
  body: string;
}

export interface UpdateNoteRequest {
  id: string;
  title: string;
  body: string;
}