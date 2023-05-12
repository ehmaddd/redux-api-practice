import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserData } from '../store/users/usersSlice';

const showUser = (user) => {
  if(user) {
    return (
      <li>
      <h1 key={user.id.value}> </h1>
      First Name : {user.name.first} <br />Last Name : {user.name.last}
      </li>
    )
  }
}

const FetchUsers = () => {
  const {users, isLoading, error}= useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  if(isLoading===true) {
    return (
        <div>Loading...</div>
    )
  }
  if(error) {
    return (
        <div>Something went wrong...</div>
    )
  }
  return (
    <ul>
    {users.map((user) => showUser(user))}
    </ul>
  )
};

export default FetchUsers;