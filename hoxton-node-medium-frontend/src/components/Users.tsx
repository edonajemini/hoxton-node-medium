import { useEffect, useState } from "react";

type User = {
    username : string,
    image : string,
    email: string,
}
export function Users(){
    const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    fetch("http://localhost:4000/users")
        .then((resp) => resp.json())
        .then((usersFromServer) => setUsers(usersFromServer));
}, [])
    return(
        <div className="users-nav">
            {
                users.map(user=>(
                    <>
                    <ul>
                    <li>{user.username}</li>
                    <p>{user.email}</p>
                    <p>user ID:{user.id}</p>
                    </ul>
                    </>
                ))
            }
        </div>
    )
}