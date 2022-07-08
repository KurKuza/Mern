import express from 'express'
import multer from 'multer'
import cors from 'cors'

import mongoose from 'mongoose'

import { loginValidation, postCreateValidation, registerValidation } from './validations.js'

import { checkAuth, handleValidationErrors } from './utils/index.js'

import { UserController, PostController } from './controllers/index.js'

mongoose
	.connect('mongodb+srv://admin:wwwwww@cluster0.z99sxnx.mongodb.net/?retryWrites=true&w=majority')
	.then(() => console.log('DB ok'))
	.catch((err) => { 'DB error', console.log(err) })

const app = express()
const storage = multer.diskStorage({
	destination: (_, __, cd) => {
		cd(null, 'uploads')
	},
	filename: (_, file, cd) => {
		cd(null, file.originalname)
	},
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`
	})
})

app.get('/tags', PostController.getLastTags)


app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update)

app.get('/', (req, res) => {
	res.send('Hello world')
})
app.listen(4444, (err) => {
	err && console.log(err)
	console.log('Server OK')
})