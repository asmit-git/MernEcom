import express from "express";
import { createCategoryController, updateCategoryController, categoriesController, singleCategoryController, deleteCategoryController } from "../controllers/categoryControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()

/*-------- Category Routes --------- */
/*-------- Create Category Route Method: POST --------- */
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)


/*-------- Create Category Route Method: PUT --------- */
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

/*-------- Get All Category Route Method: GET --------- */
router.get('/all-categories', categoriesController)

/*-------- Get Single Category Route Method: GET --------- */

router.get('/single-category/:slug', singleCategoryController)


/*-------- Delete Category Route Method: DELETE --------- */
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)



export default router