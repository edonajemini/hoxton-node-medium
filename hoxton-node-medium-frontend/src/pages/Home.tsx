import { useEffect, useState } from 'react'
type Posts = {
    id : number,
    tittle: string,
    blog: string,
    image : string,
    userId : number
    likes: []
    comments:[]
  }
type Comments = {
    id: number
    text: string
    postId: number
}
type Users = {
    username : string,
    image : string,
    email: string,
}
  export function Home(){
    const [posts, setPosts] = useState<Posts[]>([])
    useEffect(() => {
        fetch("http://localhost:4000/posts")
          .then((resp) => resp.json())
          .then((postsFromServer) => setPosts(postsFromServer));
      }, []);
    const [users, setUsers] = useState<Users[]>([])
  useEffect(() => {
    fetch("http://localhost:4000/users")
        .then((resp) => resp.json())
        .then((usersFromServer) => setUsers(usersFromServer));
}, [])
const [likes, setLikes] = useState(0)
    
const [comments, setComments] = useState<Comments[]>([])

    useEffect(() => {
        fetch(`http://localhost:4000/comments/`)
          .then((resp) => resp.json())
          .then((commentsFromServer) => setComments(commentsFromServer));
      }, []);
  

    return(
        <div>
            <h2>Add Post</h2>
            <form onSubmit={event => 
           {event.preventDefault()
            const postsCopy = structuredClone(posts)
              
              let newPost = {
                tittle: event.target.tittle.value,
                blog: event.target.blog.value,
                image: event.target.image.value,
                userid: event.target.userid.value
              }
              postsCopy.push(newPost);
              setPosts(postsCopy)

              event.target.reset();
            }}>
                <input type='text' name="tittle" id="tittle" placeholder='Tittle?' required></input>
                <textarea name='blog' id='blog' placeholder='Your Blog?' required></textarea>
                <input type='url' name='image' id='image' placeholder='Image?'></input>
                <input type='number' name="userid" id='userid' placeholder='user ID' required></input>
                <button className='post-btn' onClick={(event)=>{
    fetch("http://localhost:4000/posts",{
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({

        tittle: document.getElementById("tittle")?.value,
        blog: document.getElementById("blog")?.value,
        image: document.getElementById("image")?.value,
        userid: document.getElementById("userid")?.value
        
      }
      )
    }) .then(resp => resp.json())
    .then(postsfromserver => setPosts([...posts, postsfromserver]))
    location.reload()
  }}>POST</button>
            </form>
            
            {
            posts.map(post => (
                <>
                
                <div className='posts'>
                  <div className='tittle'>
                    <h3>{post.tittle}</h3>
                    <p>{post.blog}-</p>
                    </div>
                    <div className='image'>
                    <img src={post.image} width="200px" />
                    </div>
                    <div className='like-com-delete'>
                    <h4><button type="button" onClick={() => setLikes((likes) => likes + 1)}>❤️</button>{post.likes.length + likes}</h4>
                    <h4><button>💬</button>{post.comments.length}</h4>
                      <button onClick={()=>{
                      fetch(`http://localhost:4000/posts/${post.id}`,{
                        method:"DELETE"
                      }).then((resp) => resp.json())
                      .then(() =>
                    location.reload()
                      )
                  
                    }}> DELETE </button>
                      </div>
                </div>
                </>
              ))}

        </div>
        
    )
}