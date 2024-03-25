import toast from "react-hot-toast";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import CartCount from "./cart/CartCount"
import CartEmpty from "./cart/CartEmpty"
import CartItem from "./cart/CartItem"
import { setCartOpen } from "../app/cartSlice";
import hero from '../assets/hero.png';
const Cart = ({ fetchItems }) => {
  const dispatch = useDispatch();
  const cartOpen = useSelector(state => state.cart.cartOpen);
  const cartItems = useSelector(state => state.cart.items);
  const totalQTY = useSelector(state => state.cart.totalQTY) || 0;
  const totalAmount = useSelector(state => state.cart.totalAmount) || 0;
  const userId = useSelector(state=>state.auth.userId);

  const onCartToggle = () => {
    dispatch(setCartOpen());
  }

  const onClearCartItems = async () => {
    try {
      const response = await fetch(`https://nike-shoe-e-commerce.onrender.com/api/items/deleteAll/${userId}`, {
        method: 'DELETE'
      })
      const result = await response.json();
      if (result.status == 200)
      {
        fetchItems();
        toast.success(`Cart Cleared`);

      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkoutHandler = async (totalAmount) => {
    var data = {};
    var key = "";
    try {
      const result = await fetch("https://nike-shoe-e-commerce.onrender.com/api/getKey");
      key = await result.json();
    } catch (error) {
      console.log(error);
    }
    try {
      const result = await fetch('https://nike-shoe-e-commerce.onrender.com/api/payment/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalAmount }),
      })
      data = await result.json();
    } catch (error) {
      console.log(error);
    }

    var options = {
      "key": key,
      "amount": data.order.amount,
      "currency": "INR",
      "name": "Nike Shoe Shop",
      "description": "Test Transaction",
      "image": {hero},
      "order_id": data.order.id,
      "callback_url": "https://nike-shoe-e-commerce.onrender.com/api/payment/paymentVerification",
      "prefill": {
        "name": "Aditya Ekka",
        "email": "adityaekka2003@gmail.com",
        "contact": "8709592501"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
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
