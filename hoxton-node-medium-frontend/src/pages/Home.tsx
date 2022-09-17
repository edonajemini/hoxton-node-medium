import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "../components/Users";
type Posts = {
  id: number;
  tittle: string;
  blog: string;
  image: string;
  userId: number;
  likes: [];
  comments: [];
};

export function Home() {
  const [posts, setPosts] = useState<Posts[]>([]);
  useEffect(() => {
    fetch("http://localhost:4000/posts")
      .then((resp) => resp.json())
      .then((postsFromServer) => setPosts(postsFromServer));
  }, []);

  return (
    <div className="home">
      <h1>Blogs..</h1>
      <Users />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          let newPost = {
            tittle: event.target.tittle.value,
            blog: event.target.blog.value,
            image: event.target.image.value,
            userId: Number(event.target.userId.value),
          };
          fetch("http://localhost:4000/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
          }).then(() => {
            fetch("http://localhost:4000/posts")
              .then((resp) => resp.json())
              .then((postsFromServer) => setPosts(postsFromServer));
          });
          event.target.reset();
        }}
      >
        <input
          type="text"
          name="tittle"
          id="tittle"
          placeholder="Tittle?"
          required
        ></input>
        <input
          type="text"
          name="blog"
          id="blog"
          placeholder="Blog?"
          required
        ></input>
        <input
          type="url"
          name="image"
          id="image"
          placeholder="Image URL?"
          required
        ></input>
        <input
          type="number"
          name="userId"
          id="userId"
          placeholder="user ID?"
        ></input>
        <button>POST</button>
      </form>

      {posts.reverse().map((post) => (
        <>
          <div className="posts">
            <div link-div>
              <Link to={`/posts/${post.id}`}>
                <div className="tittle">
                  <h3>{post.tittle}</h3>
                  <p>{post.blog}..</p>
                </div>
                <div className="image">
                  <img src={post.image} width="200px" />
                </div>
              </Link>
            </div>

            <div className="like-com-delete">
              <h4>
                {" "}
                <button
                  onClick={() => {
                    fetch(`http://localhost:4000/likePosts`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ postId: post.id }),
                    })
                    .then(() => {
                      fetch("http://localhost:4000/posts")
                        .then((resp) => resp.json())
                        .then((postsFromServer) => setPosts(postsFromServer));
                    });
                  }}
                >
                  ❤️
                </button>{" "}
                {post.likes.length} likes
              </h4>
              <h4>
                <button>💬</button> {post.comments.length} comments
              </h4>
              <button
                onClick={() => {
                  fetch(`http://localhost:4000/posts/${post.id}`, {
                    method: "DELETE",
                  })
                    .then((resp) => resp.json())
                    .then(() => location.reload());
                }}
              >
                {" "}
                DELETE{" "}
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
