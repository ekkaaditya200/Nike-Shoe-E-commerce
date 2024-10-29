import Order from "../Models/order.model.js";

export const findOrder = async (req,res) => {
    try {
        const item = await Order.findOne({id:req.body.itemId});
        if(!item)
            return res.status(400).json({ status: 400, message: 'No item found' });
        
        if (item.userRef != req.params.id)
            return res.status(400).json({ status: 400, message: 'No item found for user' });

        res.status(200).json({ status: 200, message: "Item Found and is", item });
    } catch (error) {
        res.status(404).json({ message: "Internal Server Error" });
    }
}

export const showOrder = async (req, res) => {
    try {
        const Items = await Order.find({ userRef: req.params.id });
        if (!Items)
            res.status(400).json({ status: 400, message: 'No items found' });
        res.status(200).json({ status: 200, message: "Items Found and are", Items });
    } catch (error) {
        res.status(404).json({ message: "Internal Server Error" });
    }
}
export const addOrder = async (req, res) => {
    try {
        const item = await Order.create(req.body);
        return res.status(201).json({status:201, message:"Item added successfully",item});
    } catch (error) {
        console.log(error);
    }
}

export const updateOrder = async (req,res) => {
    const item = await Order.findById(req.params.id);
    if (!item) {
        return res.status(400).json({ status: 400, message: "Item not found" });
    }
    if (req.body.userId !== item.userRef) {
        return res.status(400).json({ status: 400, message: "You cand update your own Item only" });
    }
    try {
      const result = await Item.findByIdAndUpdate(req.params.id,req.body,{ new: true });
      
      res.status(200).json({status:200,message:"Item updated Successfully",result});
    } catch (error) {
        res.status(404).json({ status: 404, message: "Internal Server Error" });
    }
}

export const deleteOrder = async (req, res) => {
    const item = await Order.findById(req.params.id);
    if (!item) {
        return res.status(400).json({ status: 400, message: "Iten not found" });
    }
    if (req.body.userId !== item.userRef) {
        return res.status(400).json({ status: 400, message: "You cand delete your own Item only" });
    }
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({status:200, message:"Item has been deleted"});
    } catch (error) {
        res.status(404).json({ status: 404, message: "Internal Server Error" });
    }
}

export const deleteAllOrders = async (req,res) => {
    try {
        await Order.deleteMany({ userRef: req.params.id });
        res.status(200).json({status:200,message:"Items has been deleted successfully"});
    } catch (error) {
        res.status(404).json({ status: 404, message: "Internal Server Error" });
    }
}