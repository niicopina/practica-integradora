import express from 'express'

const server = express()

server.use('/public', express.static('public'))