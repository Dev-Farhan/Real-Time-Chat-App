import express from "express";
import { register, setAvatar , login, getAllUsers} from "../controllers/userController.js";
// import { login } from "../controllers/userController.js";
const router = express.Router();

router.post("/register",register);

router.post("/login",login);

router.post("/setavatar/:id",setAvatar);

router.get("/allusers/:id",getAllUsers)

export default router;