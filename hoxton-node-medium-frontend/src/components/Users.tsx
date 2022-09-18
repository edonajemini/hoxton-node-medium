import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Users = {
  id: ReactNode;
  username: string;
  image: string;
  email: string;
  posts: []
};
export function Users() {
  const [users, setUsers] = useState<Users[]>([]);
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((resp) => resp.json())
      .then((usersFromServer) => setUsers(usersFromServer));
  }, []);
  return (
    <div className="users-nav">
      
      {users.map((user) => (
        <>
        <Link to={`/users/${user.id}`}>
          <ul>
            <li>{user.username.toUpperCase()}</li>
            
          </ul>
          </Link>
        </>
      ))}
  
    </div>
  );
}
