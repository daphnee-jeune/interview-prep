import { useState, useEffect } from "react";

const UserList1 = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])
  return (
    <ul>
      {users.map(user => (
        <li key={user}>{user}</li>
      ))}
    </ul>
  );
};

type User = {
  id: number;
  name: string
}
const UserList2 = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/users')
      .then(res => {
        if (!res.ok) throw new Error('ERROR')
        return res.json()
      })
      .then(data => setUsers(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [users])

  if(loading) return <h1>Loading...</h1>
  if(error) return <p>Error: {error}</p>
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
// Always type the shape of the data to be returned
// Always make sure to account for loading and error states
export default { UserList1, UserList2 };
