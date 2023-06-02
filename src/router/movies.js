import { Router } from "express";
import Movie from "../models/Movie.js";

let movies_router = Router()

movies_router.post(
    '/',
    async(req, res, next) =>{
        try {
            let one = await Movie.create(req.body)
            return res.status(201).json({
                success: true,
                message: `movie id=${one._id} created`
            })            
        } catch (error) {
            next(error)
        }
    }
)
movies_router.get(
    '/',
    async(req,res,next) => {
        try {
            let all = await Movie.find()
            if(all){
                return res.status(200).json({
                    success: true,
                    data: all
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
movies_router.put(
    '/:id',
    async(req,res,next) => {
        try {
            let one = await Movie.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
            if(one){
                return res.status(200).json({
                    success: true,
                    data: one
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
movies_router.delete(
    '/:id',
    async(req,res,next) => {
        try {
            let one = await Movie.findByIdAndDelete(req.params.id)
            if(one){
                return res.status(200).json({
                    success: true,
                    message: 'movie deleted'
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

export default movies_router