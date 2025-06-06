import { UserModel } from "@/models/User";
import { ErrorResponse } from "@/ultils/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const checkAuth = async(req: Request, res: Response, next: NextFunction) => {

  const token = req?.cookies?.token
  if(!token) {
    next(new ErrorResponse('UnAuthoz', 401))
    return
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
  const uid = decoded.uid
  const user = await UserModel.findById(uid)
  req.user = user


  next()
}

export default checkAuth