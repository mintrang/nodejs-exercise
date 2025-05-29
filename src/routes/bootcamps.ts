import { Router } from 'express'
import { getBootcamps, createBootcamp } from '../controllers/bootcamps'

const router = Router()

router.route('/')
.get(getBootcamps)
.post(createBootcamp)

export default router