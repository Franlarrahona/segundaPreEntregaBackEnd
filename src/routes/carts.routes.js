import { Router } from "express";

import config from "../config.js";
import cartsModel from '../dao/models/carts.model.js';
import usersModel from '../dao/models/users.model.js';
import productsModel from '../dao/models/products.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const process = await cartsModel
            .find()
            .populate({ path: '_user_id', model: usersModel })
            .populate({path: 'products._id', model: productsModel})
            .lean();

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/one/:cid', async(req,res) =>{
    try{
        const process = await cartsModel.findById(req.params.cid);
        res.status(200).send({ origin: config.SERVER, payload: process });
    }catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const process = await cartsModel.create(req.body);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const process = await cartsModel.findOneAndUpdate(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const process = await cartsModel.findOneAndDelete(filter);

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.delete('/:cid/products', async (req, res) =>{
    const filter = {_id: req.params.cid};
    const update = {"id": filter, "products": []}
    const options = { new: true };
    
    try{
        const process = await cartsModel.findOneAndUpdate(filter, update, options)
        res.status(200).send({ origin: config.SERVER, payload: process });
    }catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
})

router.delete('/:cid/products/:pid',async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const filter = {_id : cid , products: {_id: pid}}

    try {
        const process = await cartsModel.findOneAndDelete({$and : [{_id:cid}, [products : {_id: pid}]]}
        );

        if (process) {
            res.status(200).send({
                origin: config.SERVER,
                payload: process
            });
            console.log('El producto fue removido del carrito con éxito');
        } else {
            res.status(404).send({origin: config.SERVER,payload: null,message: 'No se encontró un carrito con el ID especificado'});
            console.log('El producto no pudo ser removido del carrito');
        }
    }catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
})



export default router;