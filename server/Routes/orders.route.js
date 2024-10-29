import express from 'express';
import {showOrder, addOrder, deleteOrder, updateOrder, deleteAllOrders, findOrder} from '../Controllers/orders.controller.js';
const router = express.Router();

router.post('/add',addOrder);
router.post('/find/:id',findOrder);//User Id and Product Id
router.get('/show/:id',showOrder);//User Id only
router.delete('/delete/:id',deleteOrder); //Item Id and userId in reqbody
router.delete('/deleteAll/:id',deleteAllOrders); //User Id only
router.post('/update/:id',updateOrder); //Item Id params and userId and update in req body

export default router;