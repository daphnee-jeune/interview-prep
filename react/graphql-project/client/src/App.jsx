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

function App() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Opps an error occured: {error.message}</p>;

  return (
    <>
      <h1>Users</h1>
      <div>
        {data.getUsers.map((user) => (
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
