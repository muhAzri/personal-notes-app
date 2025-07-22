export interface ApiResponse<T = any> {
  status: 'success' | 'fail';
  message: string;
  data?: T;
}

export interface ApiError {
  status: 'fail';
  message: string;
}