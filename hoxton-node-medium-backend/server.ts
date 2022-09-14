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
//get all the posts with likes, comments and the user who wrote them
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

//create a Post
app.post('/posts', async (req, res)=>{
  const post = {
    tittle:req.body.tittle,
    blog:req.body.blog,
    image:req.body.image,
    userId: req.body.userId
  }
  let errors: string[] = []

    if (typeof req.body.tittle !== 'string') {
        errors.push('Add a proper Tittle!')
      }
    if (typeof req.body.blog !== 'string') {
        errors.push('Add a proper Blog!')
      }
    if(typeof req.body.image  !=='string') {
        errors.push('Add a proper URL')
    }
    if(typeof req.body.userId  !=='number') {
        errors.push('Add a proper user ID')
    }
    if( errors.length === 0)  {
  try{
    const newPost = await prisma.posts.create({
      data: {
        tittle:post.tittle,
        blog:post.blog,
        image:post.image,
        userId:post.userId
      },
      include: { likes: true, comments:true }
    })
    res.send(newPost)
  } catch(err) {
    // @ts-ignore
    res.status(400).send(err.message)
  }
}else {
  res.status(400).send({ errors: errors })
}
})
//Like a Post
app.post('/likePosts', async (req, res)=>{
  const like = {
    postId: req.body.postId
  }
  
  try{
    const LikePost = await prisma.likes.create({
      data: {
        postId:like.postId
      },
      include: { post:true }
    })
    res.send(LikePost)
  } catch(err) {
    // @ts-ignore
    res.status(400).send(err.message)
  }

})
//Comment a Post
app.post('/commentPosts', async (req, res)=>{
  const comment = {
    postId: req.body.postId,
    text:req.body.text
  }
  
  try{
    const CommentPost = await prisma.comments.create({
      data: {
        postId:comment.postId,
        text:comment.text
      },
      include: { post:true }
    })
    res.send(CommentPost)
  } catch(err) {
    // @ts-ignore
    res.status(400).send(err.message)
  }

})
app.listen(port, () => {
    console.log(`http://localhost:${4000}`)
})