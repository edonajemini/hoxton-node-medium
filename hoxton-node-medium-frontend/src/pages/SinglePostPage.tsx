import { useEffect, useState } from "react";
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

export function SinglePostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/posts/${params.id}`)
      .then((resp) => resp.json())
      .then((postFromServer) => setPost(postFromServer));
  }, []);

  if (post === null) return <h1>Loading... </h1>;

  return (
    <section className="post-detail">
       
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
                    <h4><button type="button" >❤️</button>{post.likes.length}</h4>
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
              
        <button
          onClick={() => {
            fetch(`http://localhost:4000/likePosts`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ postId: post.id }),
            });
          }}
        >
          ❤️
        </button>
    </section>
  );
}

function setLikes(arg0: (likes: any) => any): void {
    throw new Error("Function not implemented.");
}
