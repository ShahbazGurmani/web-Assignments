import express from 'express'
import {
  newArrivals,
  NewProduct,
  updatedProduct,
  AllProducts,
  ProductDelete,
  menCloth,
  womenCloth,
} from "../controllers/Products.js";
import { isAuthenticated } from '../middlewares/auth.js'
import { upload } from '../middlewares/multer.js'

const router = express.Router()
router.get("/allproducts", AllProducts);
router.get("/newArrivals",newArrivals)
router.get("/mencloth",menCloth)
router.get("/womencloth",womenCloth)
router.post("/addnewproduct",upload.single("fileName"),NewProduct)
router.put("/updateProduct/:id",updatedProduct)
router.delete("/deleteProduct/:id", ProductDelete)


export default router