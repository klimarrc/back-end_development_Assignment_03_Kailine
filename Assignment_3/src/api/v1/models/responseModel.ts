export interface ApiResponse<T> {
  message: string;
  data?: T;
  count?: number;
}

export const successResponse = <T>(
  message: string,
  data?: T,
  count?: number,
): ApiResponse<T> => {
  const res: ApiResponse<T> = { message };

  if (data !== undefined) res.data = data;
  if (count !== undefined) res.count = count;

  return res;
};

export interface ApiErrorResponse {
  message: string;
}

export const errorResponse = (message: string): ApiErrorResponse => ({
  message,
});
