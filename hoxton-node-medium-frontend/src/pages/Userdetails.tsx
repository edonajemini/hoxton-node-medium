import { ReactNode, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Users } from "../components/Users";

type User = {
    id: ReactNode;
    username: string;
    image: string;
    email: string;
    posts:[]
  };
  type Post = {
    id: number;
    tittle: string;
    blog: string;
    image: string;
    userId: number;
    likes: [];
    comments: [];
  };

  export function Userdetails() {
    const [posts, setPosts] = useState<Post | null>(null);
    useEffect(() => {
        fetch(`http://localhost:4000/posts/`)
          .then((resp) => resp.json())
          .then((postFromServer) => setPosts(postFromServer));
      }, []);
    const params = useParams();
    const [user, setUser] = useState<User[]>([]);
    useEffect(() => {
      fetch(`http://localhost:4000/users/${params.id}`)
        .then((resp) => resp.json())
        .then((userFromServer) => setUser(userFromServer));
    }, []);
  
  
    if (user === null) return <h1>Loading... </h1>;
    return(
        <>
        <div className="users">
            <p>Username:</p><h3> {user.username}</h3>
            <p>Email: {user.email}</p>
            <p>User ID:{user.id}</p>
            </div>
        </>
    )
}