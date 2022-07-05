import express from 'express'
import mongoose from 'mongoose'

import { loginValidation, postCreateValidation, registerValidation } from './validations.js'

import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

mongoose
	.connect('mongodb+srv://admin:wwwwww@cluster0.z99sxnx.mongodb.net/?retryWrites=true&w=majority')
	.then(() => console.log('DB ok'))
	.catch((err) => { 'DB error', console.log(err) })

const app = express()
app.use(express.json())

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)

app.get('/', (req, res) => {
	res.send('Hello world')
})
app.listen(4444, (err) => {
	err && console.log(err)
	console.log('Server OK')
})