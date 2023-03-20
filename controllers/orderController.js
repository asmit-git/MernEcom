import orderModel from "../models/orderModel.js";

export const placeOrderController = async (req, res) => {
    try {
        const { cart, address, phone, payment, amount } = req.body
        switch (true) {
            case !cart:
                return res.status(500).send({ message: 'cart is required' });
            case !address:
                return res.status(500).send({ message: 'address is required' });
            case !phone:
                return res.status(500).send({ message: 'receiver phone is required' });
        }

        const order = new orderModel({
            products: cart,
            amount: amount,
            paymentType: payment,
            paymentStatus: "pending",
            receiver: {
                address: address,
                phone: phone
            },
            buyer: req.user._id,
            status: "Not Process",
        })
        await order.save();
        res.status(201).send({
            success: true,
            message: "order placed successfully",
            order
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error Placing order",
        });
    }
}

export const getUserOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .sort({'_id':-1})
            .populate("products", "-image")
            .populate("buyer", "name");
        res.status(200).send({
            success: true,
            message: "Users orders",
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Geting Orders",
            error,
        });
    }
};

export const getUserSingleOrderController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel
            .find({ $and: [{ buyer: req.user._id }, { _id: orderId }] })
            .populate("products", "-image")
            .populate("buyer", "name");
        res.status(200).send({
            success: true,
            message: "User order",
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Geting Order",
            error,
        });
    }
}