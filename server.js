import fastify from "fastify";
import { DatabasePostgres } from "./database-postgres.js";
import fastifyCors from "@fastify/cors";

const server = fastify()
const database = new DatabasePostgres()

server.register( fastifyCors , {
  origin: '*',
  methods: ['GET']
})


server.get('/postagens', async (request, reply)=>{
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

server.listen(
  {
    port: 3333
  }
)