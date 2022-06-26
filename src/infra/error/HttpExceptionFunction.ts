import { NextFunction, Request, Response } from "express";
import { HttpException } from "./HttpException";

export function HttpExceptionFunction(
  error: Error | HttpException,
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof HttpException) {
    return response.status(error.statusCode).json({
      message: error.message,
      status: error.statusCode
    });
  }

  return response.status(500).json({
    message: error.message,
    status: 500,
  });
}
