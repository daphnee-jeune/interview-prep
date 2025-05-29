import "./App.css";
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
function App() {
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

  if (isUsersDataLoading || isUserByIdLoading) return <p>Loading...</p>;
  if (usersDataError || userByIdError)
    return <p>Opps an error occured: {usersDataError.message}</p>;

  return (
    <>
      <div>
        <h1>Chosen User</h1>
        <p>Name: {userById.getUserById.name}</p>
        <p>Age: {userById.getUserById.age}</p>
      </div>
      <div>
        <h1>Users</h1>
        {usersData.getUsers.map((user) => (
          <div>
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
