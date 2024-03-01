import fastify from "fastify";
import { DatabasePostgres } from "./database-postgres.js";
import fastifyCors from "@fastify/cors";

const server = fastify()
const database = new DatabasePostgres()

server.register( fastifyCors , {
  origin: '*',
  methods: ['GET', 'POST', 'PUT','DELETE'],
})


server.get('/', async (request, reply)=>{
  const search = request.query.search

  const postagens = await database.getPosts(search)

  return postagens
})

server.post('/postagens', async (request, reply)=>{
  const {
    title,
    postagem,
  } = request.body

  console.log(title)
  console.log(postagem)

  await database.create({
    title,
    postagem,
  })

  return reply.status(201).send()

})

server.put('/:id', async (request, reply)=>{
  const postagemId = request.params.id
  const { title, postagem } = request.body

  await database.edit(postagemId, {
    title, 
    postagem,
  })

  return reply.status(204).send()

})

server.delete('/:id', async (request, reply)=>{
  const postagemId = request.params.id

  await database.delete(postagemId)

  return reply.status(204).send()

})

server.listen(
  {
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
  }
)