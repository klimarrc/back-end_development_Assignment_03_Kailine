export interface Apiresponse<T> {
    data?: T;
    message?: string;
    error?: string;
    code?: number;
  } 

  export const successResponse = <T>(
    data: T, message?: string
  ): Apiresponse<T> => ({
    data,
    message,
  });