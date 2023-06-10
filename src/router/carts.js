import { Router } from "express";
import Cart from "../models/Cart.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

let carts_router = Router()

//se crea una cart nueva
carts_router.post(
    '/',
    async(req,res,next)=> {
        try {
            const {userId, quantity, movie_id} = req.body

            const user = await User.findById(userId)
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                })
            }
            const cart = await Cart.create({user_id: userId, quantity, movie_id})
            return res.status(201).json({
                success: true,
                message: `Cart created, ID:${cart._id}`,
                data: cart
            })
        } catch (error) {
            next(error)
        }
    }
)
//se añade pelicula nueva dentro de la cart ya creada
carts_router.post(
    '/:cartId/addMovie/:movieId',
    async(req,res,next)=>{
        try {
            const {cartId, movieId} = req.params
            const cart = await Cart.findById(cartId)
            const movie = await Movie.findById(movieId)
            if(!cart || !movie){
                return res.status(404).json({
                    success: false,
                    message: 'Cart or movie not found'
                })
            }
            cart.movie_id = movieId
            await cart.save()
            return res.status(200).json({
                success: true,
                message: 'Movie added to cart',
                data: cart
            })
        } catch (error) {
            next(error)
        }
    }
)
carts_router.get(
    '/',
    async(req,res,next)=>{
        try {
            const cart = await Cart.find().select('user_id movie_id -_id')
                .populate('user_id', 'name -_id')
                .populate('movie_id', 'title -_id')
            if(cart){
                return res.status(200).json({
                    success: true,
                    data: cart
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
carts_router.get(
    '/:id',
    async(req,res,next)=>{
        try {
            const cartId = req.params.id
            const cart = await Cart.findById(cartId)
            if(cart){
                return res.status(200).json({
                    success: true,
                    data: cart
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
carts_router.put(
    '/users/:uid',
    async(req,res,next)=>{
        try {
            const uid = req.params.uid
            const all = await Cart.updateMany({ user_id:uid}, {active:false})
            if(all){
                return res.status(200).json({
                    success: true
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
carts_router.put(
    '/:cid',
    async(req,res,next)=>{
        try {
            const cid = req.params.cid
            const data = req.body
            const cart = await Cart.findByIdAndUpdate(
                cid, //id del doc a modificar
                data, //objeto con las modificaciones a realizar
                {new: true}    
            ).populate('user_id', 'name -_id')
            return res.status(200).json({
                succes: true,
                response: cart
            })
        } catch (error) {
            next(error)
        }
    }
)
carts_router.delete(
    '/:cid',
    async(req,res,next)=> {
        try {
            const cid = req.params.cid
            const cart = await Cart.deleteOne({_id:cid})
            if(cart){
                return res.status(200).json({
                    success: true,
                    message: 'cart deleted'
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'cart not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
export default carts_router