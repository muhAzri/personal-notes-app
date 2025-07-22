export interface ITokenStorage {
  setToken(token: string): void;
  getToken(): string | null;
  removeToken(): void;
}

import { IStorage, BrowserStorage } from './IStorage';

export class LocalStorageTokenStorage implements ITokenStorage {
  private readonly TOKEN_KEY = 'accessToken';
  private storage: IStorage;

  constructor(storage: IStorage = new BrowserStorage()) {
    this.storage = storage;
  }

  setToken(token: string): void {
    this.storage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return this.storage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    this.storage.removeItem(this.TOKEN_KEY);
  }
}