import express from 'express'
import { loginController, registerController, testController } from "../controllers/authControllers.js"
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

/* router object */
const router = express.Router()

/* ...................... Routing ........................... */
/* User Register Route || Method POST */
router.post('/register', registerController)

/* User Login Route || Method POST */
router.post('/login', loginController)

/* Test for middlewares || Method GET */
router.get('/test', requireSignIn, isAdmin, testController)

/* Protected Auth Route for user */
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ success: true });
})

/* Protected Auth Route for admin */
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ success: true });
})



export default router