import { Router } from "express";
import Cart from "../models/Cart.js";
import Movie from "../models/Movie.js";

let carts_router = Router()

carts_router.post(
    '/:cartId/addMovie/:movieId',
    async(req,res,next) => {
        try {
            const{cartId, movieId} = req.params
            const cart = await Cart.findById(cartId)
            const movie = await Movie.findById(movieId)
            if(!cart || !movie){
                return res.status(404).json({
                    success: false,
                    message: 'Cart or movie not found'
                })
            }
            cart.movies.push(movie)
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