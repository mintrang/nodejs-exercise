import { Router, Request, Response } from 'express'
import { getBootcamps, createBootcamp, deleteBootcamp, updateBootcamp, getBootcamp } from '../controllers/bootcamps'
import checkAuth from '@/middleware/auth'

const router = Router()

const roles = ['admin', 'user']

router.route('/')
  .get(checkAuth, getBootcamps)
  .post(checkAuth, createBootcamp)


router.route('/:id')
  .get(checkAuth, getBootcamp)
  .put(checkAuth, updateBootcamp)
  .delete(checkAuth, deleteBootcamp)

export default router