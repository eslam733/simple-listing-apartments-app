export class ErrorResponse extends Error {
    statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  
    static handle(error: unknown, res: any) {
      if (error instanceof ErrorResponse) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message
        });
      }
  
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }