import { Request, Response, NextFunction } from 'express';
import { UserModel } from '@/models/User';
import { appHandler } from '@/ultils/AppHandler';

interface AppError extends Error {
  statusCode?: number;
  value?: string;
  code?: number;
  keyValue?: any;
}

export const getUsers = appHandler(async (req: Request, res: Response, next: NextFunction) => {

  const data = await UserModel.find().populate({path: 'bootcamp', select: '-password'})
  res.json({ success: true, data })
})

export const createUser = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  const data = await UserModel.create(body)
  res.status(201).json({
    success: true,
    data: data
  });

})

export const getUser = appHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const bootcamp = await UserModel.findById(id).select('name phone')
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