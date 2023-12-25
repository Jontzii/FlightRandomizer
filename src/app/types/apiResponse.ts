export interface ApiResponse<T> {
  version?: string;
  createdAt: number;
  results: T;
}
