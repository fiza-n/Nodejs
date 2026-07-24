import express from "express"
import {handleCreateUsers} from "../controllers/user.js"

const router = express.Router()

router.post("/", handleCreateUsers)

export default router