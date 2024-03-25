import express from 'express';
import {showItems, addItem, deleteItem, updateItem, deleteAllItems, findItem} from '../Controllers/items.controller.js';
const router = express.Router();

router.post('/add',addItem);
router.post('/find/:id',findItem);//User Id and Product Id
router.get('/show/:id',showItems);//User Id only
router.delete('/delete/:id',deleteItem); //Item Id and userId in reqbody
router.delete('/deleteAll/:id',deleteAllItems); //User Id only
router.post('/update/:id',updateItem); //Item Id params and userId and update in req body

export default router;