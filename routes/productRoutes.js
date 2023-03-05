import express from "express";
import { createProductController, updateProductController, productsController, singleProductController, deleteProductController, productImageController, filteredProductsController, productsCountController, productsListController } from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable';

const router = express.Router()

/*-------- Product Routes --------- */
/*-------- Create Product Route Method: POST --------- */
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

/*-------- Update Product Route Method: PUT --------- */
router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), updateProductController)

/*-------- Get all Product Route Method: GET --------- */
router.get('/all-products', productsController)

/*-------- Get filtered Product Route Method: GET --------- */
router.post('/filtered-products', filteredProductsController)

/*-------- Get Product Counts Method: GET --------- */
router.get('/products-count', productsCountController)

/*-------- Get Products by Page Method: GET --------- */
router.get('/products-lists/:page', productsListController)

/*-------- Get Single Product Route Method: GET --------- */
router.get('/single-product/:slug', singleProductController)


/*-------- Get Product Image Method: GET --------- */
router.get('/product-image/:id', productImageController)

/*-------- Delete Single Product Route Method: DELETE --------- */
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController)

export default router