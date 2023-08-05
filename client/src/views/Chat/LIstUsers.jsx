import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsersChat, setAllUsersChat } from '../../Redux/usersChatSlice';
import { setError } from '../../Redux/chatSlice';
import { Link } from 'react-router-dom';

const LIstUsers = ({ onUserSelect }) => {

  // Estados Globales
  // -------------------
  const allUsers = useSelector(selectAllUsersChat);
  const token = useSelector(state => state.usersChat.token);
  const user = useSelector(state => state.usersChat);
  const dispatch = useDispatch();

  useEffect(() => {
    if(user.access){
      axios.get('http://localhost:3007/api/v1/users', {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
        .then(({data}) => {
          console.log('allUsers: ', data)
          const users = data.filter(item => item.user_id !== user.user_id)
          dispatch(setAllUsersChat(users));
          dispatch(setError(""));
        }).catch(error => {
          dispatch(setError(error.response.data.response))
        })
    }
  },[user.access])

  return (
    <div className='flex flex-col w-[100%] h-[auto] mt-[50px] '>
      {
        allUsers?.map((user) => (
          <div
            key={user.user_id}
            onClick={() => onUserSelect(user) }
            className='flex h-[50px] items-center gap-[5px] cursor-pointer'
          >
            <div className='flex w-7 h-7 ml-[5px] rounded-full bg-gray-500'>
              <Link>
                <img className='w-full h-full object-cover rounded-full' src={`http://localhost:3007/${user.image}`} alt='imagen de perfil' />
              </Link>
            </div>
            <h2
              className=" text-black"
              key={user.user_id}>{user.userName}
            </h2>
          </div>
        ))
      }
    </div>
  )
}

export default LIstUsers