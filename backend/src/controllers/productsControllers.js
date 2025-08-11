import Product from "../models/item.js";
export const getAllProducts = async (req,res)=>{
    try {
        const products = await Product.find().sort({createdAt:-1})
        res.status(200).json(products)
    } catch (error) {
        console.error("Error in getAllProducts controller",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getProductById = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        console.error("Error in getProductById controller",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const createProduct = async (req,res)=>{
    try {
        const {name,description,price,category,material,stock,image,isActive} = req.body;
        const product = new Product({name,description,price,category,material,stock,image,isActive});

        const newProduct = await product.save();
        res.status(201).json(product)
    } catch (error) {
        console.error("Error in createProduct controller",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const updateProduct = async (req,res)=>{
    try {
        const {name,description,price,category,material,stock,image,isActive} = req.body;
        // const product = new Product({name,description,price,category,material,stock,image,isActive});
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{name,description,price,category,material,stock,image,isActive},{new:true})

        if(!updatedProduct){
            return(res.status(404).json({message:"Product Not Found"}))
        }
    
        res.status(200).json({message:"Product Updated Successfully"})
    } catch (error) {
        console.error("Error in updateProduct controller",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const deleteProduct = async (req,res)=>{
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).json({message:"Product Not Found"});
        }
        res.status(200).json({message:"Product Deleted Successfully"})
    } catch (error) {
        console.error("Error in deleteProduct controller",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}