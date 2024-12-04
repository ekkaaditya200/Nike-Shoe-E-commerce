import {
  HeartIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../app/authSlice";
import { setCartOpen, setClearCart } from "../app/cartSlice";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const [navState, setNavState] = useState(false);
  const dispatch = useDispatch();
  const totalQTY = useSelector((state) => state.cart.totalQTY) || 0;
  const onCartToggle = () => {
    dispatch(setCartOpen());
  };

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);

    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `https://nike-shoe-ecommerce-store.onrender.com/api/auth/logout/${userId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const result = await res.json();
      if (result.status == 200) {
        dispatch(setClearCart());
        dispatch(logout());
      }
    } catch (error) {
      console.log("Error in logout", error);
    }
  };
  return (
    <header
      className={
        !navState
          ? "absolute top-7 left-0 right-0 opacity-100 z-50"
          : "fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme"
      }
    >
      <nav className="flex items-center justify-between nike-container">
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo/img"
            className={`w-16 h-auto ${navState && "filter brightness-0"}`}
          />
        </div>
        <ul className="flex items-center justify-center gap-2">
          <li className="grid items-center">
            <MagnifyingGlassIcon
              className={`icon-style ${
                navState && "text-slate-900 transition-all duration-300"
              }`}
            />
          </li>
          <li className="grid items-center">
            <HeartIcon
              className={`icon-style ${
                navState && "text-slate-900 transition-all duration-300"
              }`}
            />
          </li>
          <li className="grid items-center">
            <button
              type="button"
              onClick={onCartToggle}
              className="border-none outline-none active:scale-110 transition-all duration-300 relative"
            >
              <ShoppingBagIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
              />
              <div
                className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${
                  navState
                    ? "bg-slate-900 text-slate-100 shadow-slate-900"
                    : "bg-slate-100 text-slate-900 shadow-slate-100"
                }`}
              >
                {totalQTY}
              </div>
            </button>
          </li>
          <li
            className={`icon-style ${
              navState && "text-slate-900 transition-all duration-300"
            } mr-10`}
          >
            {isLoggedIn ? (
              <div className="relative group">
                <UserCircleIcon
                  className={`w-7 ${
                    navState ? "text-slate-900 transition-all duration-300" : ""
                  }`}
                />
                <div className="absolute opacity-0 -right-5 top-7 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto p-5 text-center">
                  <div className="flex flex-col gap-3 w-36 text-black bg-white p-3 shadow-lg rounded-lg">
                    <div className="flex gap-3 cursor-pointer rounded-lg hover:bg-slate-300 pl-2 py-2">
                      <ShoppingCartIcon className="w-6"></ShoppingCartIcon>
                      <Link to="/orders">Orders</Link>
                    </div>
                    <div className="flex gap-3 cursor-pointer rounded-lg hover:bg-slate-300 pl-2 py-2" onClick={handleLogout}>
                      <ArrowLeftOnRectangleIcon className="w-6"></ArrowLeftOnRectangleIcon>
                      <p>
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/signin">
                <div className="text-lg mb-1 hover:text-white">Login</div>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
