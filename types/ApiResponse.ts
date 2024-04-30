export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Array<any> | object;
}
