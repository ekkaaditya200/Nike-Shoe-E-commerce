import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from '../app/authSlice';
import { setCartOpen, setClearCart } from "../app/cartSlice";
const Navbar = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [navState, setNavState] = useState(false);
    const dispatch = useDispatch();
    const totalQTY = useSelector(state=>state.cart.totalQTY) || 0;
    const onCartToggle = () => {
        dispatch(setCartOpen());
    }

    const onNavScroll = () => {
        if (window.scrollY > 30) {
            setNavState(true);
        } else {
            setNavState(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', onNavScroll);

        return () => {
            window.removeEventListener('scroll', onNavScroll);
        }
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch("https://nike-shoe-e-commerce-server.vercel.app/api/auth/logout", {
                method: 'POST',
                credentials: 'include'
            })
            const result = await res.json();
            if (result.status == 200) {
                dispatch(setClearCart());
                dispatch(logout());
            }
        } catch (error) {
            console.log("Error in logout", error);
        }
    }
    return (
        <header className={
            !navState ? 'absolute top-7 left-0 right-0 opacity-100 z-50' : 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme'
        }>
            <nav className='flex items-center justify-between nike-container'>
                <div className='flex items-center'>
                    <img
                        src={logo}
                        alt="logo/img"
                        className={`w-16 h-auto ${navState && "filter brightness-0"}`}
                    />
                </div>
                <ul className='flex items-center justify-center gap-2'>
                    <li className='grid items-center'>
                        <MagnifyingGlassIcon className={`icon-style ${navState && "text-slate-900 transition-all duration-300"}`} />
                    </li>
                    <li className='grid items-center'>
                        <HeartIcon className={`icon-style ${navState && "text-slate-900 transition-all duration-300"}`} />
                    </li>
                    <li className='grid items-center'>
                        <button type='button' 
                        onClick={onCartToggle} 
                        className='border-none outline-none active:scale-110 transition-all duration-300 relative'>
                            <ShoppingBagIcon className={`icon-style ${navState && "text-slate-900 transition-all duration-300"}`} />
                            <div className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${navState ? 'bg-slate-900 text-slate-100 shadow-slate-900' : 'bg-slate-100 text-slate-900 shadow-slate-100'}`}>{totalQTY}</div>
                        </button>
                    </li>
                    <li className={`mt-2 icon-style ${navState && "text-slate-900 transition-all duration-300"}`}>
                        {
                            isLoggedIn ? (
                                <p className="cursor-pointer" onClick={handleLogout}>
                                    Logout
                                </p>
                            ) : (
                                <Link to='/signin'>
                                    Login
                                </Link>
                            )
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Navbar
