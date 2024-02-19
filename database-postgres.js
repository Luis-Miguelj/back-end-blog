import { sql } from "./db.js";
import { randomUUID } from 'node:crypto'

export class DatabasePostgres {
  async getPosts(search){

    let postagens

    if(search){
      postagens = await sql`select * from posts where title ilike ${'%'+search+'%'}`
    }else{
      postagens = await sql`select * from posts`
    }

    return postagens
  }

  async create(post){
    const postagensId = randomUUID()

    const { title, postagem } = post

    await sql`insert into posts (id, title, postagem) VALUES (${postagensId}, ${title}, ${postagem})`.then(()=>{
      console.log('Adicionados a tabela')
    })

  }
}