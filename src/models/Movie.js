import {model, Schema } from 'mongoose'

let collection = 'movies'
let schema = new Schema({
    title: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true }
})
let Movie = model(collection, schema)

export default Movie