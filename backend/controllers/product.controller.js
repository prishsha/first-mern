import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.log("Error in fetching product:", error.message);
        res.status(500).json({ success: false, message: "" })
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; //product details pulled from req.body

    if (!product.name || !product.price || !product.image)//checks whether any of the fields are missing
    {
        return res.status(400).json({ success: false, message: "Please provide all fields" });//sends a response with a 400 HTTP status code along with a message
    }

    const newProduct = new Product(product);//creates new instance of Product model

    try {
        await newProduct.save();//attempts to save newly created newProduct to the database; await ensures that the  asynchronous operation completes before moving on 
        res.status(201).json({ success: true, data: newProduct });//if save is successfull, server responds with 201 Created status
    }
    catch (error) {
        console.error("Error in create product:", error.message);//on encountering error, catch block logs the message to the console
        res.status(500).json({ success: false, message: "Server error" });//sends a response with 500 Internal Server Error status
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID" });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    //console.log("id: ", id);

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    }
    catch (error) {
        console.log("error in deleting product", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};