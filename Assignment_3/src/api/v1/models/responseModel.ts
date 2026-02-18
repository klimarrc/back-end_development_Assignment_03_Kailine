export interface Apiresponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: string;
    code?: number;
  } 

  export const successResponse = <T>(
    data: T, message?: string
  ): Apiresponse<T> => ({
    status: "success",
    data,
    message
  });