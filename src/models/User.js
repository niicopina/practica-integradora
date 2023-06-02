import { model, Schema } from 'mongoose'

let collection = 'users'
let schema = new Schema({
    name: { type: String, required: true},
    age: { type: Number }
})
let User = model(collection, schema)

export default User