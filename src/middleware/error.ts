import { NextFunction, Request, Response } from "express"

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({success: false, error: err.message || 'Server Error!', middleware: true})
}

export default errorHandler