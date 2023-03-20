import express from 'express'
import { getUserOrdersController, getUserSingleOrderController, placeOrderController } from '../controllers/orderController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

/* router object */
const router = express.Router()

/* ...................... Routing ........................... */
/* place order Route || Method POST */
router.post('/place-order', requireSignIn, placeOrderController)
router.get("/user-orders", requireSignIn, getUserOrdersController);
router.get("/single-order/:orderId", requireSignIn, getUserSingleOrderController);



export default router