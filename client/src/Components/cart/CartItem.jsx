import toast from "react-hot-toast";
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
const CartItem = ({item,fetchItems}) => {
  const userId = useSelector(state=>state.auth.userId);
  const onRemoveItem = async (ItemId) =>{
    try{
      const response = await fetch(`https://nike-shoe-e-commerce-server.vercel.app/api/items/delete/${ItemId}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
      })
      const result = await response.json();
      if(result.status==200)
      {
        fetchItems(); 
        toast.success(`${item.title} removed from cart`)
      }
    }catch(error){
      console.log(error)
    }
  }

  const updateItem = async (ItemId,cartQuantity) => {
    try{
      const response = await fetch(`https://nike-shoe-e-commerce-server.vercel.app/api/items/update/${ItemId}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, cartQuantity}),
      })
      const result = await response.json();
      if(result.status == 200)
        fetchItems();
    }catch(error){
      console.log(error)
    }
  }

  const onIncreaseItemQTY = async (ItemId) =>{
    const cartQnty = item.cartQuantity+1;
    updateItem(ItemId,cartQnty);
    fetchItems();
    toast.success(`Item QTY Increased`)
  }
  const onDecreaseItemQTY = async (ItemId) =>{
    const cartQnty = item.cartQuantity-1
    if(cartQnty>=1)
    {
      updateItem(ItemId,cartQnty);
      fetchItems();
      toast.success(`Item QTY Decreased`)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between w-full px-5">
        <div className="flex items-center gap-5">
          <div className={`bg-gradient-to-b ${item.color} ${item.shadow} relative rounded p-3 hover:scale-105 transition-all duration-75 ease-in-out grid items-center`}>
            <img src={item.imageUrl} alt={`img/cart-item/${item.id}`} className="w-36 h-auto object-fill lg:w-28" />
            <div className='absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded'>${item.price}</div>
          </div>
          <div className="grid items-center gap-4">
            <div className="grid items-center leading-none">
              <h1 className="font-medium text-lg text-slate-900 lg:text-sm">{item.title}</h1>
              <p className="text-sm text-slate-800 lg:text-xs">{item.text}</p>
            </div>
            <div className="flex items-center justify-around w-full">
              <button onClick={()=>onDecreaseItemQTY(item._id)} type="button" className="bg-theme-cart rounded w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90">
                <MinusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
              </button>
              <div className="bg-theme-cart rounded text-white font-medium lg:text-xs w-7 h-6 lg:h-5 lg:w-6 flex items-center justify-center">{item.cartQuantity}</div>
              <button onClick={()=>onIncreaseItemQTY(item._id)} type="button" className="bg-theme-cart rounded w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90">
                <PlusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid items-center gap-5">
          <div className="grid items-center justify-center">
            <h1 className="text-lg lg:text-base text-slate-900 font-medium">${item.price * item.cartQuantity}</h1>
          </div>
          <div className="grid items-center justify-center">
            <button type="button" onClick={()=>onRemoveItem(item._id)} className="bg-theme-cart rounded p-1 lg:p-0.5 grid items-center justify-items-center cursor-pointer">
              <TrashIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

CartItem.propTypes = {
  item:PropTypes.object.isRequired,
  fetchItems:PropTypes.func.isRequired,
}
export default CartItem
