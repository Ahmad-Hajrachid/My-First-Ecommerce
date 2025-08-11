import express from "express"
import { getAllProducts,getProductById,createProduct,updateProduct,deleteProduct } from "../controllers/productsControllers.js"
import { authenticateAdmin } from "../middleware/userAuthentication.js";
const router = express.Router();

router.get('/',getAllProducts)
router.get('/:id',getProductById)
router.post('/',authenticateAdmin,createProduct)
router.put('/:id',authenticateAdmin,updateProduct)
router.delete('/:id',authenticateAdmin,deleteProduct)

export default router