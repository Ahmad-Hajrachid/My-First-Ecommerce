import express from "express"
const router = express.Router();
import {saveOrder} from '../controllers/orderSaveController.js'


router.post('/',saveOrder)

export default router