import express from "express";
import { login,Register,logout } from "../controllers/Users.js";

const router = express.Router()

router.post("/login",login)
router.post("/register",Register)
router.get("/logout",logout)

export default router;