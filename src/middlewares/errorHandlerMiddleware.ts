import { NextFunction, Request, Response } from "express";

import { AppError } from "@errors/AppError";

const errorHandlerMiddleware = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
): void | Response => {
  return res.status(AppError.getErrorStatusCode(err)).json({
    success: false,
    message: AppError.getErrorMessage(err),
  });
};

export { errorHandlerMiddleware };
