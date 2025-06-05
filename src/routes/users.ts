import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/users";
import { getUser } from "../controllers/users";

const router = Router()
router.route('/')
.get(getUsers)
.post(createUser)

router.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

export default router