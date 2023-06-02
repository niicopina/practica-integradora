import { Router } from "express";
import User from '../models/User.js'

let users_router = Router()

users_router.post(
    '/',
    async(req,res,next)=>{
        try {
            let one = await User.create(req.body)
            return res.status(201).json({
                success: true,
                one
            })
        } catch (error) {
            next(error)
        }
    }
)
users_router.get(
    '/',
    async(req,res,next)=>{
        try {
            const users = await User.find()
            if(users){
                return res.status(200).json({
                    success: true,
                    data: users
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'users not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
users_router.put(
    '/:id',
    async(req,res,next)=>{
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
            if(user){
                return res.status(200).json({
                    success: true,
                    data: user
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'user not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
users_router.delete(
    '/:id',
    async(req,res,next)=>{
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            if(user){
                return res.status(200).json({
                    success: true,
                    message: 'user deleted'
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'user not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
export default users_router