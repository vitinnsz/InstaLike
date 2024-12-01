import 'dotenv/config'
import conectarAoBanco from '../config/dbConfig.js'
import { ObjectId } from 'mongodb'

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

export async function getTodosPosts() {
  const db = conexao.db('teste-alura') // nome do banco
  const colecao = db.collection('posts') // nome da coleção
  return colecao.find().toArray()
}

export async function criarPost(novoPost) {
  const db = conexao.db('teste-alura') // nome do banco
  const colecao = db.collection('posts') // nome da coleção
  return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db('teste-alura') // nome do banco
  const colecao = db.collection('posts') // nome da coleção
  const objId = ObjectId.createFromHexString(id)
  return colecao.updateOne({_id: new ObjectId(objId)}, { $set: novoPost })
  
}
