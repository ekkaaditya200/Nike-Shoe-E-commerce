import toast from "react-hot-toast";
import { ShoppingBagIcon, StarIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setCartOpen } from '../../app/cartSlice'
const Item = ({ fetchItems, ifExists, id, title, color, shadow, text, img, btn, rating, price }) => {
    const dispatch = useDispatch();
    const userRef = useSelector(state => state.auth.userId);

    const addItem = async () => {
        try {
            const result = await fetch("https://nike-shoe-e-commerce.onrender.com/api/items/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, title, text, imageUrl: img, color, shadow, price, cartQuantity: 1, userRef })
            });
            const data = await result.json();
            if (data.status == 201) {
                toast.success(`${title} added to Cart`);
                fetchItems();
            }
        }
        catch (error) {
            console.log("Cant add item to db : ", error)
        }
    }

    const updateItem = async (_id, cartQuantity) => {
        try {
            const response = await fetch(`https://nike-shoe-e-commerce.onrender.com/api/items/update/${_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userRef, cartQuantity }),
            })
            const result = await response.json();
            if (result.status == 200) {
                toast.success(`Item QTY Increased`);

                fetchItems();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const findItem = async () => {
        try {
            const result = await fetch(`https://nike-shoe-e-commerce.onrender.com/api/items/find/${userRef}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: id })
            });
            const data = await result.json();
            if (data.status == 200) {
                updateItem(data.item._id, data.item.cartQuantity
                    + 1);
            }
            else if (data.status == 400) {
                addItem();
            }
        }
        catch (error) {
            console.log("Internal Server error : ", error)
        }
    }

    const handleAddItem = async () => {
        findItem();
    }

    const onCartToggle = () => {
        dispatch(setCartOpen(true));
    }
    return (
        <div className={`relative bg-gradient-to-b ${color} ${shadow} grid items-center ${ifExists ? 'justify-items-start' : 'justify-items-center'} rounded-xl py-7 px-7 transition-all duration-700 ease-in-out w-full hover:scale-105`}>

            <div className={`grid items-center justify-items-center $${ifExists ? 'justify-items-start' : 'justify-items-center'}`}>
                <h1 className='text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow'>{title}</h1>
                <p className='text-slate-200 filter drop-shadow text-base md:text-sm font-normal'>{text}</p>

                <div className='flex items-center justify-center w-28 my-2 gap-5'>

                    <div className='flex items-center bg-white/90 px-2 rounded blur-effect-theme'>
                        <h1 className='text-black text-sm font-medium'>{price}</h1>
                    </div>

                    <div className='flex items-center gap-1'>
                        <StarIcon
                            className='icon-style w-5 h-5 md:w-4 md:h-4'
                        />
                        <h1 className='md:text-sm font-normal text-slate-100'>{rating}
                        </h1>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <button type='button' onClick={handleAddItem} className='bg-white/90 blur-effect-theme button-theme p-0.5 shadow-sky-200'><ShoppingBagIcon
                        className='icon-style text-slate-900' /></button>
                    <button onClick={() => { handleAddItem(); onCartToggle(); }} type='btn' className='bg-white/90 blur-effect-theme button-theme px-2 py-1 shadow-sky-200 text-sm text-black'>{btn}</button>
                </div>
            </div>

            <div className={`flex items-center ${ifExists ? 'absolute top-5 right-1' : 'justify-center'}`}>
                <img
                    src={img}
                    alt={`img/item-img/${id}`}
                    className={`transitions-theme hover:-rotate-12 ${ifExists ? 'h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]' : 'h-36 w-64'}`}></img>
            </div>
        </div>
    )
}

Item.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    shadow: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    btn: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    ifExists: PropTypes.bool,
    fetchItems: PropTypes.func.isRequired,
}

export default Item
