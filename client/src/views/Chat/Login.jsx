import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import validation from './validationLogin';
import axios from 'axios';
import styleRegister from './Register/styleRegister.css';
import { setUserChat, setUserImage, setUserName } from '../../Redux/usersChatSlice';


const Login = () => {

  const [formRegister, setFormRegister] = useState({
    userName:"",
    avatar:"",
  });
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const userName = useSelector(state => state.usersChat.userName);
  const usersChat = useSelector(state => state.usersChat);
  const avatars = useSelector(state => state.usersChat.avatars);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = event => {
    const { value, name } = event.target;
    setFormRegister({
      ...formRegister,
      [name]: value
    });
    setFormErrors(validation({
      ...formRegister,
      [name]: value
    }))
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [name]: true,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let auxErrors = Object.values(formErrors).every(value => value === "");
    if(auxErrors){
      dispatch(setUserName(formRegister.userName));
      dispatch(setUserImage(formRegister.avatar));
      navigate('/Trends_app_MVP/chat')
    }
  };

  const openModal = () => { setIsModalOpen(true) };
  const closeModal = () => {
    setIsModalOpen(false)
    setMessage('');
  };

  useEffect(() => {
    console.log("Form: " , formRegister);
    const errors = validation(formRegister);
    //console.log("TOUCH: ", touchedFields)

    if(Object.keys(touchedFields).length  > 0){
      setFormErrors({
        "userName": errors.userName || "",
      });
    }
    //console.log("FORMERROR: " , formErrors);
    if(Object.keys(errors).length === 0) setFormValid(true);
    else setFormValid(false);
  }, [formRegister, touchedFields]);

  useEffect(()=> {
    //if()
    console.log('userName LOGIN: ', userName)
    console.log('message LOGIN: ', message)
    console.log('USER: ', usersChat)
  },[message, usersChat])

  return (
    <div className='flex w-[100%] h-[calc(100vh-80px)] justify-center fixed top-[80px] left-0  '>
      <div className='flex flex-col w-[360px] h-[fit-content] justify-center items-center border-2 border-blue-950 bg-blue-600 shadow-2xl p-[30px] rounded-md mt-[20px] '>
        <h1 className='text-[aqua] text-xl mb-[5px]  '>Sign In</h1>
        <form  onSubmit={handleSubmit}
          className='flex flex-col border-2 p-[20px] rounded-md w-full h-[fit-content] justify-center itme'
        >
          <div className='flex flex-col shadow-white ' >
              <label className='mt-[8px] text-left' >Username</label>
              <input
                className='rounded-md h-[40px] p-[5px] shadow-white  '
                onChange={handleChange}
                onBlur={handleBlur}
                value={formRegister.userName}
                autoComplete='off'
                name='userName' type="text" placeholder='escriba userName aquí'
              />
          </div>
          {touchedFields.userName && formErrors.userName && <p className='text-red-600' >{formErrors.userName}</p>}

          <div className='flex gap-[5px] flex-col  text-black items-center '>
            <label className='text-left w-[100%]'>Escoge un avatar</label>
            <select value="default" name="avatar" onChange={handleChange} onBlur={handleBlur}
              className='text-black w-[100%] rounded-md p-[3px] '
            >
              <option className='rounded-sm' value="default" hidden >selecciona aquí</option>
              {
                avatars.map((item, index) => (<option key={index} value={item.url}>{item.name}</option>))
              }
            </select>
            <div>
              <img className='h-[200px] object-cover' src={`${formRegister.avatar}`} alt="avatar" />
            </div>
          </div>
          {touchedFields.rol && formErrors.rol && <p className='text-red-600 text-left' >{formErrors.rol}</p>}


          {/*//* BOTON DE ENVIAR */}
          <div className='flex justify-center'>
            <button
              className={`flex w-[fit-content] text-blue-400 p-[8px] rounded-lg mt-[10px]
                bg-blue-950 hover:bg-blue-500 hover:text-blue-950 transform hover:scale-105 transition duration-300 buttonRegister`}
              type='submit'  disabled={!formValid}
            >Entrar</button>
          </div>
        </form>
        <div className='flex gap-[5px] justify-center items-center ' >
            <h3 className='text-sm'>¿No tienes cuenta?</h3>
            <Link className='text-xs text-blue-300' to={'/Trends_app_MVP/chat/register-chat'}>Registrate</Link>
        </div>
      </div>
      {
        isModalOpen && (
          <div className='flex h-full w-full fixed border-2 bg-zinc-900/90 inset-y-0 inset-x-0 items-center justify-center'>
              <div className='bg-white flex flex-col border-2 justify-center items-center p-20 w-auto h-28 rounded-lg'>
                  <h1 className='text-blue-950 my-2'>{message}</h1>
              <button onClick={closeModal} className='rounded-lg my-2 p-3 text-blue-100 bg-blue-600 w-min ' >Cerrar</button>
              </div>
          </div>
        )
      }
    </div>

  )
}

export default Login