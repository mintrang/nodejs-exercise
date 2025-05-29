import { Router, Request, Response } from 'express'
import { getBootcamps, createBootcamp, deleteBootcamp, updateBootcamp, getBootcamp } from '../controllers/bootcamps'

const router: Router = Router()

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp)


router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp)
  
export default router