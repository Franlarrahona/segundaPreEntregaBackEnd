import cartsModel from './models/carts.model.js';


class CartsManager{
    constructor(){

    }
    getAll =  async () =>{
        try {
            const process = cartsModel.find().lean();
            return await process 
        } catch(err){
            return err.message;
        }
    }
    getById = async (cid) =>{
        try{
            const process = cartsModel.findById(cid).lean()
            const result = process.find()

            return await result
        }catch(err){
            return err.message;
        }
    }
    add = async (newData) =>{
        try {
            const process = cartsModel.create(newData)
            return await process
        }catch(err){
            return err.message;
        }
    }
    update = async (filter, update, options) =>{
        try{
            const process = cartsModel.findOneAndUpdate(filter, update, options);
            return await process
        }catch(err){
            return err.message;
        }
    }
    delete = async(filter) =>{
        try{
            const process = cartsModel.findOneAndDelete(filter);
            return await process
        }catch(err){
            return err.message;
        }
    }

    deleteProducts = async(filter,update, options) =>{
        try{
            const process = cartsModel.findOneAndUpdate(filter,update,options)
            return await process
        }catch(err){
            return err.message
        }
    }

    deleteOneProduct = async (cid, pid) =>{
        try{
            const updatedCart =  cartsModel.findByIdAndUpdate(
                cid,
                {$pull:{products:{product: pid}}},
                {new:true}
            )
            if(!updatedCart) {
                throw new error("carrito no encontrado o el producto no esta en el carrito");

            }

            const deletedProducts = updatedCart.products.find(
                (product) => product.product.toString() === pid
            );
            return await deletedProducts;
        }catch(err){
            return err.message
        }
    }

    
}

export default CartsManager;