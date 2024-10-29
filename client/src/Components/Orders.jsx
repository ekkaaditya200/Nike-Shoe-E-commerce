import {useSelector } from "react-redux";
import OrderItem from "./order/OrderItem";
import { useNavigate } from "react-router-dom";
import backarrow from "../assets/backarrow.svg";

const Orders = ({fetchOrders}) => {
  const cartOrders = useSelector((state) => state.cart.orders);
  const navigate = useNavigate();

  return (
    <div className="p-5 w-full h-screen">
      <div className="flex items-center justify-center gap-3">
        <button className="absolute top-5 left-9" onClick={() => navigate("/")}>
          <img src={backarrow} className="w-8 active:scale-75"></img>
        </button>
        <div className="grid items-center">
          <h1 className="text-lg font-medium text-slate-900">
            Your Orders{" "}
            <span className="bg-theme-cart rounded px-1 py-0.5 text-slate-100 font-normal text-sm">
              ({cartOrders.length} Orders)
            </span>
          </h1>
        </div>
      </div>
      {cartOrders?.length === 0 ? (
        <div className="text-lg font-bold flex justify-center items-center h-full w-full"><p>No Order Yet !</p></div>
      ) : (
        <div>
          <div className="flex flex-row gap-5 flex-wrap p-5">
            {cartOrders?.map((item, i) => (
              <OrderItem key={i} item={item} fetchOrders={fetchOrders}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default Orders;
