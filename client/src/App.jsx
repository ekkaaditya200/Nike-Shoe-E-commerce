import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FlexContent, Hero, Sales, Stories, Footer, Navbar, Cart, Orders } from "./Components/index"
import { heroapi, popularsales, toprateslaes, highlight, sneaker, story, footerAPI } from "./Data/data"
import SignIn from "./Pages/SignIn"
import SignUp from './Pages/SignUp'
import { useSelector, useDispatch } from "react-redux"
import { setCartItem, setOrderItem, setTotalAmount, setTotalQuantity } from "./app/cartSlice";
import { useEffect } from "react"
function App() {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const userId = useSelector(state => state.auth.userId);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  useEffect(() => {
    let totalAmount = 0;
    let totalQTY = 0;

    if (cartItems?.length > 0) {
      totalQTY = cartItems.length;
      cartItems.forEach(item => {
        totalAmount += item.cartQuantity * item.price;
      });
    }
    dispatch(setTotalAmount(totalAmount));
    dispatch(setTotalQuantity(totalQTY));
  }, [cartItems, dispatch]);

  const fetchItems = async () => {
    try {
      const result = await fetch(`https://nike-shoe-ecommerce-store.onrender.com/api/items/show/${userId}`, {
        method: "GET",
      });
      const data = await result.json();
      if (data.status == 200) {
        dispatch(setCartItem(data.Items));
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchOrders = async () => {
    try{
      const result = await fetch(`https://nike-shoe-ecommerce-store.onrender.com/api/orders/show/${userId}`, {
        method:"GET",
      });
      const data = await result.json();
      if(data.status == 200)
      {
        dispatch(setOrderItem(data.Items))
      }
    }catch(error)
    {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchItems();
    fetchOrders();
  }, [isLoggedIn==true]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar/>
            <Cart fetchItems={fetchItems} fetchOrders={fetchOrders}/>
            <main className="flex flex-col gap-16 relative">
              <Hero heroapi={heroapi}></Hero>
              <Sales endpoint={popularsales} fetchItems={fetchItems} ifExists />
              <FlexContent endpoint={highlight} ifExists></FlexContent>
              <Sales endpoint={toprateslaes} fetchItems={fetchItems} />
              <FlexContent endpoint={sneaker}></FlexContent>
              <Stories story={story}></Stories>
            </main>
            <Footer footerAPI={footerAPI}></Footer>
          </>
        }
        >
        </Route>
        <Route path="/orders" element={<Orders fetchOrders={fetchOrders}></Orders>}></Route>
        <Route path='/signin' element={<SignIn/>}>
        </Route>
        <Route path='/signup' element={<SignUp />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
