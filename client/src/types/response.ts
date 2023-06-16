export type SuccessResponse<T> = {
  success: true;
  message?: string;
  data?: T | null;
}

export type ErrorResponse = {
  success: false;
  message: string;
  errors?: string;
  code?: number;
}

export type Response<T=unknown> = SuccessResponse<T> | ErrorResponse