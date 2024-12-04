import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

const OrderItem = ({ item, fetchOrders}) => {
  const userId = useSelector((state) => state.auth.userId);
  const onRemoveOrder = async (ItemId) => {
    try {
      const response = await fetch(
        `https://nike-shoe-ecommerce-store.onrender.com/api/orders/delete/${ItemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      const result = await response.json();
      if (result.status == 200) {
        fetchOrders();
        toast.success(`Order cancelled for ${item.title}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between w-[400px] py-2 px-5 border-2 border-gray-100 rounded-md">
        <div className="flex items-center justify-evenly gap-5 w-full ">
          <div
            className={`bg-gradient-to-b ${item.color} ${item.shadow} relative rounded p-3 hover:scale-105 transition-all duration-75 ease-in-out grid items-center`}
          >
            <img
              src={item.imageUrl}
              alt={`img/cart-item/${item.id}`}
              className="w-36 h-auto object-fill lg:w-28"
            />
            <div className="absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded">
              ${item.price}
            </div>
          </div>

          <div className="flex flex-col w-auto gap-4 ">
            <div className="grid items-center leading-none">
              <h1 className="font-medium text-lg text-slate-900 lg:text-sm">
                {item.title}
              </h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-row items-center justify-between w-full gap-3">
               <div className="flex flex-col gap-1">
               <div className="flex flex-row gap-2 text-[12px]">
                  <div>Qty : {item.cartQuantity}</div>
                  <div>Total : ${item.price * item.cartQuantity}</div>
                </div>
                <p className="text-red-300 text-[11px]">Arriving on 2nd Oct</p>
               </div>
                <button
                  type="button"
                  onClick={() => onRemoveOrder(item._id)}
                  className="bg-theme-cart rounded p-1 lg:p-0.5  cursor-pointer"
                >
                  <TrashIcon className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
