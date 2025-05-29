import { Request, Response } from 'express';

export const getBootcamps = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: 'Get all bootcamps' });
};

export const createBootcamp = (req: Request, res: Response) => {
  res.status(201).json({ success: true, data: 'Create new bootcamp' });
}; 