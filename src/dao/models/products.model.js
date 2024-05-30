import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'products';

const schema = new mongoose.Schema({
    id: { type: String, required: true},
    nombre: { type: String, required: true},
    categoria: { type: String, required: true},
    precio: { type: Number, required: true},
    descripcion: { type: String, required: false},
    stock: { type: Number, required: true},
    
})

const model = mongoose.model(collection, schema);

export default model;
