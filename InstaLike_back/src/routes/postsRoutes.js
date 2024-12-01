import express from 'express'
import multer from 'multer'
import cors from 'cors'

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200, 
}

import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
  atualizarNovoPost,
} from '../controllers/postsControllers.js'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  },
})

const upload = multer({ dest: './uploads', storage })

const routes = (app) => {
  app.use(express.json())
  app.use(cors(corsOptions))

  app.get('/posts', listarPosts)
  app.post('/posts', postarNovoPost)
  app.post('/upload', upload.single('imagem'), uploadImagem)
  app.put('/upload/:id', atualizarNovoPost)
}

export default routes
