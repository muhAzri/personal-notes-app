import { ApiClient } from './apiClient';
import { LocalStorageTokenStorage } from '@core/application/interfaces/ITokenStorage';
import { BrowserNavigationService } from '@core/application/interfaces/INavigationService';

// Create singleton instance with dependencies
export const apiClient = new ApiClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  tokenStorage: new LocalStorageTokenStorage(),
  navigationService: new BrowserNavigationService(),
});