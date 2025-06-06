import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/users";
import { getUser } from "../controllers/users";
import checkAuth from "@/middleware/auth";

const router = Router()
router.route('/')
.get(checkAuth, getUsers)
.post(checkAuth, createUser)

router.route('/:id')
.get(checkAuth, getUser)
.put(checkAuth, updateUser)
.delete(checkAuth, deleteUser)

export default router