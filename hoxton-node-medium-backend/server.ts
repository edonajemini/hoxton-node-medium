import express, { Express } from "express";
import cors from 'cors'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

const port = 4000

app.get('/', (req, res) => {
    res.send(`
    <ul>
    <li><a href="/users">Users</a></li>
    <li><a href="/posts">Posts</a></li>
    <li><a href="/likes">Likes</a></li>
    <li><a href="/comments">Comments</a></li>
    </ul>
    `)
  })

// get all users with their posts
app.get('/users', async(req, res)=>{
    const users = await prisma.users.findMany({include:{posts: true}})
    res.send(users)
})
// get users with their posts by ID
app.get('/users/:id', async (req, res) => {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
      include: { posts: true}
    })
  
    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ error: 'User not found.' })
    }
  })
//delete user
app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const user = await prisma.users.delete({
      where: { id }
    })
    res.send({message: "User deleted"})
  })
//get posts with likes, comments and the user who wrote them
app.get('/posts', async(req, res)=>{
  const posts = await prisma.posts.findMany({include:{user: true, likes:true, comments:true}})
  res.send(posts)
})
// get posts with likes, comments and their user by ID
app.get('/posts/:id', async (req, res) => {
  const post = await prisma.posts.findUnique({
    where: { id: Number(req.params.id) },
    include: { user: true, likes: true, comments:true }
  })

  if (post) {
    res.send(post)
  } else {
    res.status(404).send({ error: 'Post not found.' })
  }
})
//delete post
app.delete('/posts/:id', async (req, res) => {
  const id = Number(req.params.id)
  const post = await prisma.users.delete({
    where: { id }
  })
  res.send({message: "Post deleted"})
})
app.listen(port, () => {
    console.log(`http://localhost:${4000}`)
})