import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '@core/domain/entities/ApiResponse';
import { ITokenStorage } from '@core/application/interfaces/ITokenStorage';
import { INavigationService } from '@core/application/interfaces/INavigationService';

export interface ApiClientConfig {
  baseURL: string;
  tokenStorage: ITokenStorage;
  navigationService: INavigationService;
}

class ApiClient {
  private client: AxiosInstance;
  private tokenStorage: ITokenStorage;
  private navigationService: INavigationService;

  constructor(config: ApiClientConfig) {
    this.tokenStorage = config.tokenStorage;
    this.navigationService = config.navigationService;

    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor for authentication
    this.client.interceptors.request.use((config) => {
      const token = this.tokenStorage.getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => response,
      (error: unknown) => {
        this.handleResponseError(error);
        return Promise.reject(new Error('API request failed'));
      }
    );
  }

  private handleResponseError(error: unknown): void {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      this.tokenStorage.removeToken();
      this.navigationService.navigateTo('/login');
    }
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url);
    return response.data;
  }

  async post<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data;
  }
}

export { ApiClient };