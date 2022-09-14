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
                      <h4>Likes:{post.likes.length}</h4>
                      <h4>Comments: {post.comments.length}</h4>
                      
                </div>
              ))}
        </div>
    )
}