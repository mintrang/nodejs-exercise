import { Request, Response, NextFunction } from 'express';
import { BootcampModel as Bootcamps } from '../models/Bootcamp';
import { appHandler } from '@/ultils/AppHandler';
import { ErrorResponse } from '@/ultils/ErrorResponse';
import transporter from '@/ultils/sendEmail';
import sendEmail from '@/ultils/sendEmail';

interface AppError extends Error {
  statusCode?: number;
  value?: string;
  code?: number;
  keyValue?: any;
}

export const getBootcamps = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Bootcamps.find().populate({
    path: 'user',
    select: '-password -name'
  })
  res.json({ success: true, data })
});

export const createBootcamp = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  const data = await Bootcamps.create(body)
  res.status(201).json({
    success: true,
    data: data
  });
});

export const getBootcamp = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const bootcamp = await Bootcamps.findById(id).select('name phone')
  if (!bootcamp) {
    next(new ErrorResponse('Not foud', 404))
    return
  }
  res.json({
    success: true,
    data: bootcamp
  })
});

export const updateBootcamp = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const bootcamp = await Bootcamps.findById(id)
  if (!bootcamp) {
    next(new ErrorResponse('Not foud', 404))
    return
  }

  const body = req.body
  const update = await Bootcamps.findByIdAndUpdate(id, body, { new: true })
  res.json({
    success: true,
    data: update
  })
});

export const deleteBootcamp = appHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const bootcamp = await Bootcamps.findById(id).select('name phone')
  if (!bootcamp) {
    next(new ErrorResponse('Not foud', 404))
    return
  }

  await Bootcamps.findByIdAndDelete(id)
  res.json({
    success: true,
    data: {}
  })
});