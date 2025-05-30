import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USERS,
  GET_USER_BY_ID,
  CREATE_USER,
  DELETE_USER,
} from "./queries.graphql";

export const useUsers = () => {
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
  const [createUserMutation] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const [deleteUserMutation] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const createUser = async () => {
    await createUserMutation({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
  };

  const deleteUser = async (id) => {
    await deleteUserMutation({
      variables: {
        id,
      },
    });
  };

  return {
    users: usersData?.getUsers || [],
    isUsersDataLoading,
    usersDataError,

    user: userById.getUserById || null,
    isUserByIdLoading,
    userByIdError,

    createUser,
    deleteUser,
  };
};
