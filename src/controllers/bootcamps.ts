import { Request, Response } from 'express';
import { Bootcamps } from '../models/Bootcamps';

export const getBootcamps = async (req: Request, res: Response) => {
  try {
    const data = await Bootcamps.find()
    res.json({ success: true, data })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }
};

export const createBootcamp = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const data = await Bootcamps.create(body)
    res.status(201).json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }

};

export const getBootcamp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamps.findById(id).select('name phone')
    res.json({
      success: true,
      data: bootcamp
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }

};

export const updateBootcamp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamps.findById(id)
    if (!bootcamp) {
      res.status(404).json({
        success: false
      })
      return
    }

    const body = req.body
    const update = await Bootcamps.findByIdAndUpdate(id, body, { new: true })
    res.json({
      success: true,
      data: update
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }
};

export const deleteBootcamp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamps.findById(id).select('name phone')
    if (!bootcamp) {
      res.status(404).json({
        success: false
      })
      return
    }

    await Bootcamps.findByIdAndDelete(id)
    res.status(404).json({
      success: true,
      data: {}
    })


  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }
};