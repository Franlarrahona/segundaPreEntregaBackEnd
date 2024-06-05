import mongoose from 'mongoose';
import usersModel from './users.model.js'
import productsModel from './products.model.js';

mongoose.pluralize(null);

const collection = 'carts';

const schema = new mongoose.Schema({
    _user_id: {type: mongoose.Schema.Types.ObjectId, required:true, ref: 'users_index'} ,
    products: { type: [{ _id: mongoose.Schema.Types.ObjectId, qty: Number,}],  ref: 'products'},
    
});


const autoPopulate = function(next) {
    this.populate({ path: "_user_id", model: usersModel });
    this.populate({ path: 'products._id', model: productsModel });
    next();
};


schema.pre('find', autoPopulate)



const model = mongoose.model(collection, schema);

export default model;