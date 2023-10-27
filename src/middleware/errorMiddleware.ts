import { NextFunction, Request, Response } from 'express';

class ResponseError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const errorMiddleware = async (err: ResponseError | Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: err.message,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        errors: err.message,
      })
      .end();
  }
};

export { ResponseError, errorMiddleware };
