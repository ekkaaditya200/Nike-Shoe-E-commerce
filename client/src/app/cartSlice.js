import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartOpen:false,
    items:[],
    orders:[],
    totalQTY:'',
    totalAmount:'',
}
const cartSlice = createSlice({
    initialState,
    name:'cart',
    reducers:{
        setCartOpen:(state)=>{
            state.cartOpen = !state.cartOpen;
        },  
        setCartItem:(state,action) => {
           state.items=action.payload;
           state.totalQTY= action.payload.length; 
           action.payload.forEach(item=>{
            state.totalAmount += item.cartQuantity * item.price;
           })
        },
        setTotalQuantity:(state,action)=>{
            state.totalQTY = action.payload;
        },
        setTotalAmount:(state,action)=>{
            state.totalAmount=action.payload;
        },
        setClearCart:(state)=>{
            state.items=[];
            state.totalQTY=0;
            state.totalAmount=0;
        },
        setOrderItem:(state,action) => {
            state.orders=action.payload;
         },
    }
})

export const {setCartOpen, setCartItem, setTotalQuantity, setTotalAmount, setClearCart, setOrderItem} = cartSlice.actions;

export default cartSlice.reducer;