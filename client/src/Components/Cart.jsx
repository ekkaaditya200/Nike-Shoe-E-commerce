import toast from "react-hot-toast";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import CartCount from "./cart/CartCount"
import CartEmpty from "./cart/CartEmpty"
import CartItem from "./cart/CartItem"
import { setCartOpen } from "../app/cartSlice";
import { useNavigate } from "react-router-dom";
const Cart = ({ fetchItems, fetchOrders}) => {
  const dispatch = useDispatch();
  const cartOpen = useSelector(state => state.cart.cartOpen);
  const cartItems = useSelector(state => state.cart.items);
  const totalQTY = useSelector(state => state.cart.totalQTY) || 0;
  const totalAmount = useSelector(state => state.cart.totalAmount) || 0;
  const userId = useSelector(state=>state.auth.userId);


  const navigate=useNavigate();

  const onCartToggle = () => {
    dispatch(setCartOpen());
  }

  const onClearCartItems = async (flag) => {
    try {
      const response = await fetch(`https://nike-shoe-e-commerce.onrender.com/api/items/deleteAll/${userId}`, {
        method: 'DELETE'
      })
      const result = await response.json();
      if (result.status == 200)
      {
        fetchItems();
        if(flag)
            toast.success(`Cart Cleared`);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addItem = async (id, title, text, imageUrl, color, shadow, price, cartQuantity, userRef) => {
    try {
        const result = await fetch("https://nike-shoe-e-commerce.onrender.com/api/orders/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, title, text, imageUrl, color, shadow, price, cartQuantity, userRef })
        });
        const data = await result.json();
        if (data.status == 201) {
            console.log("Item added to Orders");
        }
    }
    catch (error) {
        console.log("Cant add order to db : ", error)
    }
}


const addIntoOrder = async () => {
  cartItems.map((item)=>{
    const {id,title,_id,imageUrl,price,shadow,text,userRef,color,cartQuantity}=item;
    addItem(id,title,text,imageUrl,color,shadow,price,cartQuantity,userRef)
  })
}

  const checkoutHandler = async (totalAmount) => {
    let data = {};
    let key = "";
  
    // Fetch Razorpay key from the backend
    try {
      const keyResult = await fetch("https://nike-shoe-e-commerce.onrender.com/api/getKey");
      key = await keyResult.json();
    } catch (error) {
      console.log("Error fetching Razorpay key:", error);
    }
  
    // Fetch order details from the backend
    try {
      const paymentResult = await fetch('https://nike-shoe-e-commerce.onrender.com/api/payment/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalAmount }),
      });
      data = await paymentResult.json();
      console.log("Order data:", data);
    } catch (error) {
      console.log("Error creating order:", error);
    }
  
    // Razorpay payment options
    const options = {
      key: key,
      amount: data.order.amount,
      currency: "INR",
      name: "Nike Shoe Shop",
      description: "Test Transaction",
      order_id: data.order.id,
      prefill: {
        name: "Aditya Ekka",
        email: "adityaekka2003@gmail.com",
        contact: "8709592501"
      },
      theme: {
        color: "#3399cc"
      },
      handler: async function (response) {
        console.log("Payment Success:", response);
  
        // After successful payment, verify payment on the backend
        try {
          const verificationResult = await fetch('https://nike-shoe-e-commerce.onrender.com/api/payment/paymentVerification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              totalAmount
            }),
          });
          
          const verificationResponse = await verificationResult.json();
          console.log("Payment verification response:", verificationResponse);
  
          if (verificationResponse.success) {
            addIntoOrder();
            fetchOrders();
            onClearCartItems(false);
            onCartToggle();
            navigate('/orders');
          } else {
            console.log("Payment verification failed. Please try again.");
          }
        } catch (error) {
          console.log("Error during payment verification:", error);
        }
      },
      modal: {
        ondismiss: function () {
          console.log("Payment was cancelled by the user");
        }
      }
    };
  
    const razor = new window.Razorpay(options);
    razor.open();
  };
  
  

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme duration-500 w-full h-screen opacity-100 z-[250] ${cartOpen
          ? "opacity-100 visible translate-x-0"
          : "opacity-0 invisible translate-x-8"
          }`}
      >
        <div
          className={`blur-effect-theme duration-500 h-screen max-w-xl w-full absolute right-0 ${cartOpen
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible translate-x-8"
            }`}
        >
          <CartCount totalQTY={totalQTY} onCartToggle={onCartToggle} onClearCartItems={onClearCartItems} />
          {cartItems?.length === 0 ? <CartEmpty onCartToggle={onCartToggle} /> : <div>
            <div className="flex items-start justify-start flex-col gap-y-7 lg:gap-y-5 overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-3">
              {cartItems?.map((item, i) => (
                <CartItem key={i} item={item} fetchItems={fetchItems} />
              ))}
            </div>

            <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center">
              <div className="flex items-center justify-between">
                <h1 className="text-base font-semibold uppercase">SubTotal</h1>
                <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">${totalAmount}</h1>
              </div>
              <div className="grid items-center gap-2">
                <p className="text-sm font-medium text-center">Taxes and Shipping Will Calculate At Shipping</p>
                <button type="button" onClick={() => checkoutHandler(totalAmount)} className="button-theme bg-theme-cart text-white">
                  Checkout
                </button>
              </div>
            </div>

          </div>}
        </div>
      </div>
    </>
  );
};

Cart.propTypes = {
  fetchItems: PropTypes.func.isRequired,
};

export default Cart
