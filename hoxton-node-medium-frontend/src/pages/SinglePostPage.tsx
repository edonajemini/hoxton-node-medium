import { ReactNode, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Post = {
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
  id: ReactNode;
  username : string,
  image : string,
  email: string,
}

export function SinglePostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const params = useParams();
  const [comments, setComments] = useState<Comments[]>([])
  const [users, setUsers] = useState<Users[]>([])

  useEffect(() => {
      fetch(`http://localhost:4000/comments/`)
        .then((resp) => resp.json())
        .then((commentsFromServer) => setComments(commentsFromServer));
    }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/posts/${params.id}`)
      .then((resp) => resp.json())
      .then((postFromServer) => setPost(postFromServer));
  }, []);
  
  useEffect(() => {
  fetch(`http://localhost:4000/users`)
      .then((resp) => resp.json())
      .then((usersFromServer) => setUsers(usersFromServer));
}, [])
  if (post === null) return <h1>Loading... </h1>;

  return (
    <section className="post-detail">
       
                <>
                <div className='posts'>
                  <div className='tittle'>
                  <img src={post.image} width="400px" />
                  <p>User ID {post.userId}</p>
                    <h3>{post.tittle}</h3>
                    <p>{post.blog}</p>
                    <p>{post.blog}</p>
                    <p>{post.blog}</p>
                    <p>{post.blog}</p>
                    <p>{post.blog}</p>
                    </div>
                    <div className='image'>
                    </div>
                    <div className='like-com-delete'>
                    <h4> <button
          onClick={() => {
            fetch(`http://localhost:4000/likePosts`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ postId: post.id }) ,
            }).then((resp)=> resp.json()).then(()=> location.reload());
          }}>❤️</button>{post.likes.length} Likes</h4>
                    <h4><button>💬{post.comments.length} Comments</button></h4>
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
              
       
    </section>
  );
}
