import "./App.css";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, GET_USER_BY_ID, CREATE_USER, DELETE_USER } from './queries.graphql'

function App() {
  const [newUser, setNewUser] = useState({});
  const {
    data: usersData,
    loading: isUsersDataLoading,
    error: usersDataError,
  } = useQuery(GET_USERS);
  const {
    data: userById,
    loading: isUserByIdLoading,
    error: userByIdError,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: Math.floor(Math.random() * 3) },
  });
  const [ createUser ] = useMutation(CREATE_USER);
  const [ deleteUser ] = useMutation(DELETE_USER);

  if (isUsersDataLoading || isUserByIdLoading) return <p>Loading...</p>;
  if (usersDataError || userByIdError)
    return <p>Opps an error occured: {usersDataError.message}</p>;

  const handleCreateUser = async () => {
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
  };
  const handleDeleteUser = async (id) => {
    console.log("HERE")
    await deleteUser({
      variables: {
        id
      }
    })
  }
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Age.."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <button onClick={handleCreateUser}>Create user</button>
      </div>
      <div>
        <h1>Chosen User</h1>
        <p>Name: {userById.getUserById.name}</p>
        <p>Age: {userById.getUserById.age}</p>
      </div>
      <div>
        <h1>Users</h1>
        {usersData.getUsers.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Marital status: {user.isMarried ? "Married" : "Single"}</p>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
