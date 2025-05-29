import "./App.css";
import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

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
    variables: { id: "1" },
  });
  const [ createUser ] = useMutation(CREATE_USER);

  if (isUsersDataLoading || isUserByIdLoading) return <p>Loading...</p>;
  if (usersDataError || userByIdError)
    return <p>Opps an error occured: {usersDataError.message}</p>;

  const handleCreateUser = async () => {
    console.log(newUser);
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
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
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
