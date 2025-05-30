import "./App.css";
import { useState } from "react";
import { useUsers } from "./useUsers";

function App() {
  const [newUser, setNewUser] = useState({});
  const {
    usersData,
    userById,
    isUsersDataLoading,
    isUserByIdLoading,
    usersDataError,
    userByIdError,
    createUser,
    deleteUser,
  } = useUsers();

  if (isUsersDataLoading || isUserByIdLoading) return <p>Loading...</p>;
  if (usersDataError || userByIdError)
    return <p>Opps an error occured: {usersDataError.message}</p>;

  const handleCreateUser = async () => {
    await createUser({ ...newUser, isMarried: false });
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
  };
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
