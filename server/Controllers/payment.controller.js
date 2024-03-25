import { instance } from "../Razorpay/razorpay.js"

export const checkout = async (req,res) => {
    const options = {
        amount:Number(req.body.totalAmount*100),
        currency:"INR",
    };
    const order = await instance.orders.create(options);
    res.status(201).json({status:201,order: order});
}

export const paymentVerification = async (req, res) => {
    res.redirect('https://6601c89fc1dfcf30214879cb--golden-hotteok-426593.netlify.app/orders');
};
