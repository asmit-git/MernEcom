import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        /* Validations */
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is Required' })
        }
        if (!address) {
            return res.send({ message: 'Address is Required' })
        }
        /* Check for exisiting users */
        const exisitingUser = await userModel.findOne({ email })

        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "User Already Registered! Please Login"
            })
        }

        /* Register User */
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, email, password: hashedPassword, phone, address }).save()
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "User Registration Successful",
            data: user
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while registering user",
            error
        })
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        /* Validations */
        if (!email || !password) {
            return res.status(404).send({
                succcess: false,
                message: "invalid email or password"
            })
        }
        /* User Login */

        /* check if user is available or not */
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                succcess: false,
                message: "Email is not registered"
            })
        }

        /* check if password matches or not */
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        /* Generate Token if everything goes well */
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Logged in Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Logging in user",
            error
        })
    }
};

export const testController = (req, res) => {
    res.status(200).send({
        success: true,
        message: "Protected Routes"
    })
}