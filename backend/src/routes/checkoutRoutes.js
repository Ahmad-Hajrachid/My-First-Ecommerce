import express from "express"
const router = express.Router();

import { createCheckOut } from "../controllers/paymentsControllers.js";

router.post('/',createCheckOut)
export default router