import { Router } from "express";
import Cart from "../models/Cart.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

let carts_router = Router()

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
    '/:id',
    async(req,res,next)=>{
        try {
            const cartId = req.params.id
            const newMovieId = req.body.id
            const cart = await Cart.findById(cartId)
            if(!cart){
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
            cart.movie_id = newMovieId
            await cart.save()
            return res.status(200).json({
                success: true,
                data: cart
            })
        } catch (error) {
            next(error)
        }
    }
)
carts_router.delete(
    '/:id',
    async(req,res,next)=> {
        try {
            const cart = await Cart.findByIdAndDelete(req.params.id)
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