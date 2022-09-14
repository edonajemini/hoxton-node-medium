import { useEffect, useState } from 'react'
type Posts = {
    id : number
    tittle: string 
    blog: string
    image : string
    userId : number
    likes :[]
    comments :[]
  }
  export function Home(){
    const [posts, setPosts] = useState<Posts[]>([])
    useEffect(() => {
      fetch("http://localhost:4000/posts")
        .then((resp) => resp.json())
        .then((postsFromServer) => setPosts(postsFromServer));
    }, []);

    return(
        <div>
            <h2>Add Post</h2>
            <form className='addpost-form' 
       onSubmit={event => {event.preventDefault()
const postCopy = structuredClone(newPost)
let newPost = { 
  tittle: event.target.tittle.value,
  blog: event.target.blog.value,
  image: event.target.image.value,
  userId: event.target.userId.value
}
postCopy.push(newPost);
setPosts(postCopy)
}}>
  <input className='tittle-input' type="text" name='tittle' id='tittle' placeholder='Tittle?' required></input>
  <textarea className='blog-input' name='blog' id='blog' placeholder='Blog?' required></textarea>
  <input className='url-input' type="url" name="image" id='image' placeholder='The Image URL'></input>
  <input className='userId' type='number' name='userId' id='userId' placeholder='User ID' required></input>
  <button className='addpost-btn' onClick={(event)=>{
    fetch("http://localhost:4000/posts",{
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        tittle: document.getElementById("tittle")?.value,
        blog: document.getElementById("blog")?.value,
        image: document.getElementById("image")?.value,
        userId: document.getElementById("userId")?.value
      }
      )
    }) .then(resp => resp.json())
    .then(newpostsfromserver => setPosts([...posts, newpostsfromserver]))
  }}>
 Post
 </button>
</form>
            {
            posts.map(post => (
                <div className='posts'>
                  <div className='tittle'>
                    <h3>{post.tittle}</h3>
                    <p>{post.blog}-</p>
                    </div>
                    <div className='image'>
                    <img src={post.image} width="200px" />
                    </div>
                      <h4>❤️{post.likes.length}</h4>
                      <h4>💬{post.comments.length}</h4>
                      <button onClick={()=>{
                      fetch(`http://localhost:4000/posts/${post.id}`,{
                        method:"DELETE"
                      }).then((resp) => resp.json())
                      .then(() =>
                    location.reload()
                      )
                  
                    }}> REMOVE </button>
                      
                </div>
              ))}
        </div>
    )
}