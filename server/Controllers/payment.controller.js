import { instance } from "../Razorpay/razorpay.js"
import crypto from 'crypto';


export const checkout = async (req,res) => {
    const options = {
        amount:Number(req.body.totalAmount*100),
        currency:"INR",
    };
    const order = await instance.orders.create(options);
    res.status(201).json({status:201,order: order});
}

// export const paymentVerification = async (req, res) => {
//     res.status(200).json({ message: "Payment successful and cart cleared!" });
// };

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Create a hash to verify the payment signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
                                  .update(body.toString())
                                  .digest('hex');

  if (expectedSignature === razorpay_signature) {
    // Payment is verified
    // Now you can perform actions like clearing the cart and saving the order
    // Example: Save the order details to the database and return a success response
    res.status(200).json({ message: "Payment successful and verified!", success: true });
  } else {
    res.status(400).json({ message: "Payment verification failed", success: false });
  }
};
