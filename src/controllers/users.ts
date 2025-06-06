import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

import { UserModel } from '@/models/User';
import { appHandler } from '@/ultils/AppHandler';
import sendEmail from '@/ultils/sendEmail';
import { ErrorResponse } from '@/ultils/ErrorResponse';

dotenv.config()

interface AppError extends Error {
  statusCode?: number;
  value?: string;
  code?: number;
  keyValue?: any;
}

export const getUsers = appHandler(async (req: Request, res: Response, next: NextFunction) => {

  const data = await UserModel.find().populate({ path: 'bootcamp', select: '-password' })
  res.json({ success: true, data })
})

export const createUser = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  const data = await UserModel.create(body)
  const { email } = body

  const link = `${req.protocol}/verify?token=`
  verifyUser(email, link)
  res.status(201).json({
    success: true,
    data: data
  });

})

const verifyUser = (email: string, link: string) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1d'
  });
  sendEmail('acc_crreate', { to: email, content: `${link}${token}` })
}

export const verify = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
  const user = await UserModel.findOne({ email: decoded?.email })
  if (!user) {
    next(new ErrorResponse('Email not exist', 404))
    return
  }

  user.verify = true
  await user.save()

  res.status(201).json({
    success: true,
    data: user
  });
})

export const getUser = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const bootcamp = await UserModel.findById(id)
  if (!bootcamp) {
    const error = new Error('Không tìm thấy user') as AppError;
    error.statusCode = 404;
    return next(error);
  }

  res.json({
    success: true,
    data: bootcamp
  })
})

export const updateUser = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const bootcamp = await UserModel.findById(id)
  if (!bootcamp) {
    const error = new Error('Không tìm thấy user') as AppError;
    error.statusCode = 404;
    return next(error);
  }

  const body = req.body
  const update = await UserModel.findByIdAndUpdate(id, body, { new: true })
  res.json({
    success: true,
    data: update
  })

})

export const deleteUser = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = await UserModel.findById(id)
  if (!user) {
    const error = new Error('Không tìm thấy user') as AppError;
    error.statusCode = 404;
    return next(error);
  }

  await user.deleteOne()
  res.json({
    success: true,
    data: {}
  })
})