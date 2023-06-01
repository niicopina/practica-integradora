import { Router } from "express";
import Movie from "../models/Movie.js";

let movies_router = Router()

movies_router.post(
    '/',
    async(req, res, next) =>{
        try {
            let one = await Movie.create(req.body)            
        } catch (error) {
            next(error)
        }
    }
)
movies_router.get()
movies_router.put()
movies_router.delete()

export default movies_router