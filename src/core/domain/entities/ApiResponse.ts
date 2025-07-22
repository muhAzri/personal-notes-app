export interface ApiResponse<T = unknown> {
  status: 'success' | 'fail';
  message: string;
  data?: T;
}

export interface ApiError {
  status: 'fail';
  message: string;
}