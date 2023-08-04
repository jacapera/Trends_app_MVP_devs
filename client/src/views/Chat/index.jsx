import React,  { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMinimized, setIsMinimized } from '../../Redux/chatSlice';
import { setUserChat } from '../../Redux/usersChatSlice';
import adjuntarIcon from '../../assets/TestIcons/adjuntar.png';
import enviarIcon from '../../assets/TestIcons/enviar.png';
//import scrollbar from './scrollbar.css?inline';
import scrollbar from './scrollbar.css';
import PDFPreview from './PDFPreview';
import Login from './Login';
import Register from './Register/Register';
import ListUsers from './ListUsers';

const Chat = () => {
  //* ============ ESTADOS LOCALES =======================
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] =useState('');
  const [preview, setPreview] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messagesSelected, setMessagesSelected] = useState([]);

  //* ============  ESTADOS GLOBALES =============================
  const userName = useSelector(state => state.usersChat.userName);
  const usersChat = useSelector(state => state.usersChat);
  const isMinimized = useSelector(selectIsMinimized);

  //* ====== VARIABLES =============
  const messagesRef = useRef(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //* =========== HANDLERS ====================
  // Capturar el mensage en mi estado local
  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  }
  // Selecionar un usuario
  const handleUserSelection = (user) => {
    setSelectedUser(user);
    console.log('selectedUser: ',selectedUser);
  };
  // Función para evitar ejectuar formulario al dar enter
  const handleKeyDow = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      message.trim() !== ''&& handleSubmit(event);
    }
  };
  // Función para el envio del archivo adjunto
  const handleSubmitFile = (event) => {
    event.preventDefault();
    if(!selectedUser) {
      setMessage('Selecciona un usuario para enviar mensaje')
      openModal()
      return
    }
    const fecha = formatDate(new Date());
    const emisor = usersChat.user_id;
    const receptor = selectedUser?.user_id;
    const userNameReceptor = selectedUser?.username;
    const imageReceptor = selectedUser?.profile_image;
    const file = {
      name: selectedFile?.name,
      size: selectedFile?.size,
      type: selectedFile?.type,
      lastModifiedDate: selectedFile?.lastModifiedDate,
      lastModified: selectedFile?.lastModified,
      data: selectedFile
    }
    setMessages([
      ...messages,
      {
        emisor,
        receptor,
        message,
        userNameEmisor: usersChat.userName,
        userNameReceptor,
        imageEmisor:usersChat.image,
        imageReceptor,
        fecha,
        file
      }
    ]);
    socket.emit("private-message", {
      emisor,
      receptor,
      message,
      userNameEmisor: usersChat.userName,
      userNameReceptor,
      imageEmisor:usersChat.image,
      imageReceptor,
      fecha,
      file
    });
    setMessage("");
    setSelectedFile(null);
    setPreview(false);
  };
  // Enviando evento (mensaje) al servidor socket
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!selectedUser) {
      setMessage('Selecciona un usuario para enviar mensaje')
      openModal()
      return
    }
    if(message !== '' ){
      const fecha = formatDate(new Date());
      const emisor = usersChat.user_id;
      const receptor = selectedUser?.user_id;
      const userNameReceptor = selectedUser?.username;
      const imageReceptor = selectedUser?.profile_image;
      setMessages([...messages, {
        emisor, receptor, message, userNameEmisor: usersChat.userName,
        userNameReceptor, imageEmisor: usersChat.image, imageReceptor, fecha
      }]);
      socket.emit("private-message", {
        emisor, receptor, message, userNameEmisor: usersChat.userName,
        userNameReceptor, imageEmisor: usersChat.image, imageReceptor, fecha
      });
      setMessage("");
      setPreview(false);
    }
  };
  // Enviar el archivo al estado local
  const handleFilechange = (event) => {
    const file = event.target.files[0];
    if(file){
      //console.log('file: ', file);
      setSelectedFile(file);
      setPreview(true);
      // Crear una URL local temporal para la vista previa del archivo
      setFilePreview(URL.createObjectURL(file));
      //window.open(URL.createObjectURL(file))
    }
  };
  // Función para cancelar el envio del archivo adjunto
  const handleCancelUpload = () => {
    setSelectedFile(null);
    setFilePreview('');
    setPreview(false);
    fileInputRef.current && (fileInputRef.current.value='');
  };

  //*============== FUNCIONES ================================================
  // Función para descargar el archivo adjunto
  const downloadFile = (event, fileData) => {
    event.preventDefault();
    const {name, size, type, lastModifiedDate, lastModified, data} = fileData;
    const blob = new Blob([data], {type});
    // Establecer el nombre del archivo de descarga
    // (nombre con el que se guardará en el disco)
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
  };
  // Formatear fecha
  const formatDate = (date) => {
    // Obtener el nombre del día de la semana
    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const nombreDiaSemana = diasSemana[date.getDay()];
    // Obtener la hora y los minutos
    const hora = date.getHours();
    let minutos = date.getMinutes();
    minutos < 10 ? minutos=`0${minutos}`: minutos;
    // Concatenar fecha
    return `${nombreDiaSemana} ${hora}:${minutos}`;
  };
  // Función para cambiar el estado de isMinimized
  const toggleMinimize = (event) => {
    event.preventDefault();
    isMinimized === true
      ? dispatch(setIsMinimized(false))
      : dispatch(setIsMinimized(true));
  };
  // Función para salir del Chat
  const exitChat = (event) => {
    event.preventDefault();
    dispatch(setUserChat({
      user_id:"",
      userName:"",
      image:"",
      access:false
    }))
    setMessages([]);
  };
  // Función para convertir un ArrayBuffer a base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    // console.log(window.btoa(binary));
    return window.btoa(binary);
  };
  // Guardar todos los mensajes para renderizar
  const receiveMessage = messagesServer => {
    //setMessages(state => [...state, message]);
    setMessages(messagesServer);
  }
  // Abri y cerrar ventana modal
  const openModal = () => { setIsModalOpen(true) };
  const closeModal = () => {
    setIsModalOpen(false)
    setMessage('');
  };

  // Función para filtrar los mensajes por emisor y receptor
  const filterMessagesByChat = (emisor, receptor) => {
    return messages.filter(
      (message) =>
        (message.emisor === emisor && message.receptor === receptor) ||
        (message.emisor === receptor && message.receptor === emisor)
    );
  };
  // Filtrar mensajes por el chat activo
  const activeChatMessages = selectedUser
    ? filterMessagesByChat(usersChat.user_id, selectedUser.user_id)
    : [];

  //*=========== CICLOS DE VIDA ===========================
  // Conexión de Socket al servidor
  useEffect(() => {
    const newSocket = io('http://localhost:3004');
    setSocket(newSocket);
    return () => {
      socket && newSocket.disconnect();
    };
  },[]);
  // Controlar el scroll para mejorar experiencia de usuario
  useEffect(() => {
    const messageContainer = messagesRef.current;
    messageContainer && (messageContainer.scrollTop = messageContainer.scrollHeight);
    console.log('messages: ', messages);
    console.log('activeChatMessages: ', activeChatMessages);
  },[messages, preview, activeChatMessages])
  // Envia username para agregar usuario conectados al servidor
  useEffect(() => {
    socket?.emit("newUser", userName);
  },[socket, userName]);
  // Escuchando eventos de los mensajes del receptor
  useEffect(() => {
    socket?.on("mensaje-recibido", receiveMessage);
    return () => {socket?.off("mensaje-recibido", receiveMessage)};
  },[receiveMessage]);
  // Para Debugin
  // useEffect(() => {
  //   //console.log('filePreviwe: ', filePreview);
  //   //console.log('selectedFile: ', selectedFile);
  //   //console.log('preview: ', preview)
  //   console.log('isMinimizeDefaul-false: ',isMinimized);
  //   console.log('userName: ',user.userName);
  //   console.log('image: ', user.image);
  //   console.log('access: ', user.access);
  // },[filePreview, selectedFile, preview, isMinimized,user]);

  // Obtiene el valor de la propiedad 'image' del último objeto en activeChatMessages
  const lastImage = activeChatMessages[activeChatMessages.length - 1]?.profile_image;

  // Utiliza el operador de fusión nula (??) para mostrar selectedUser.image si existe,
  // de lo contrario, muestra lastImage.
  const imageToShow = selectedUser?.profile_image ?? lastImage;


  return (
    <div>
      {
        !userName ? <Login /> :
        (
          <div className={`flex w-[100%] border-2 ${usersChat.access && "hidden"}`}>
            {
              !isMinimized ? (
                // *================================================
                // *CONTENEDOR PRINCIPAL EN PAGINA COMPLETA DEL CHAT
                // *================================================
                <div className='container-chat w-[100%] h-[100%] flex items-center justify-center border-2'>
                  {/* //*CONTENEDOR PRINCIPAL PANEL IZQUIERDO */}
                  <div className='flex flex-col bg-white border-2 border-slate-400 w-[30%] h-full '>
                    {/* ENCABEZADO IZQUIERDO (mi foto y username)*/}
                    <div className='flex items-center left-[4px] top-[70] gap-3 bg-slate-400 w-[30%] h-[50px] fixed'>
                      <div className='flex w-7 h-7 ml-[5px] rounded-full bg-gray-500'>
                        <img className='w-full h-full object-cover rounded-full' src={`${usersChat.image}`} alt='imagen de perfil' />
                      </div>
                      <h2 className='my-2'>{usersChat.userName}</h2>
                    </div>
                    <div>
                      <ListUsers onUserSelect= {handleUserSelection} />
                    </div>
                    <div></div>
                  </div>
      
                  {/* //* CONTENEDOR PRINCIPAL PANEL DERECHO */}
                  <div className='flex flex-col w-[70%] h-[calc(100vh-70px)] relative bottom-[36px] pb-[0px] border-2 border-slate-500 bg-white'>
                    {/* ENCABEZADO DERECHO (foto y nombre del Chat actual, ya se grupal o individual) */}
                    <div className='flex justify-between items-center pr-[15px] gap-1 bg-slate-500 w-[100%] h-[50px] '>
                      <div className='flex items-center  ml-[5px] gap-3'>
                        <div className='flex w-7 h-7 rounded-full bg-gray-500'>
                          {/* Foto del grupo o usuario al que se le envia mensajes */}
                          <img className='w-full h-full object-cover rounded-full' src={`${imageToShow}`} alt='foto de perfil' />
                        </div>
                        <h2 className='my-2'>{selectedUser?.username}</h2>
                      </div>
                      {/* BOTONES CHAT */}
                      <div className='flex gap-3 p-2'>
                        {/* minimizar chat*/}
                        <button
                          onClick={toggleMinimize}
                          className='flex justify-center items-center border-l border-r h-5 w-5 bg-gray-400 border-blue-950 rounded-md'
                        ><h1 className='text-lg text-black'>-</h1></button>
                        {/* cerrar chat*/}
                        <button
                          onClick={exitChat}
                          className='flex justify-center items-center border-l border-r h-5 w-5 bg-gray-400 border-blue-950 rounded-md'
                        ><h1 className='text-lg text-black'>x</h1></button>
                      </div>
                    </div>
                    {/* //*CONTENEDOR DEL CHAT */}
                    <div
                      className='text-white flex-col w-full h-[calc(100%-60px)] flex'
                    >
                      {/* cuerpo del chat aca se renderizan todos los mensajes */}
                      <ul ref={messagesRef} className={`w-[100%] h-[calc(100%-60px)] pl-[40px] pr-[10px] bg-white items-end flex-col overflow-y-auto custom-scrollbar`}>
                        {
                          activeChatMessages.map((message, index) => (
                            // *CONTENEDOR PRINCIPAL DE CADA MENSAJE INDIVIDUAL
                            //*-------------------------------------------------
                            <li key={index}
                              className={` my-[2px] mx-[3px] p-1 table text-sm w-[auto] max-w-[60%] rounded-md
                                ${message.userNameEmisor === usersChat.userName ? "bg-blue-200 text-blue-900 ml-auto": "li-message mr-auto rounded-tl-[0%]"}
                              `}>
                              {/* //*Contenedor para la imagen de perfil, userName, hora mensaje */}
                              <div className='flex items-center w-full gap-2 px-1 mt-0 mb-1'>
                                { /** validación mostrar foto de quien envia mensaje */
                                  message.userNameEmisor !== usersChat.userName && <div className='flex w-7 h-7 rounded-full bg-gray-500 relative right-[46px]'>
                                    <img className='w-full h-full object-cover rounded-full' src={`${message.image}`} alt='foto de perfil' />
                                  </div>
                                }
                                { /** Validación para mostrar userName de quien envia mensaje */
                                  message.userNameEmisor !== usersChat.userName &&
                                    <span
                                      className='text-[18px] font-bold text-slate-300 flex relative right-[37px]'
                                    >{message.userNameEmisor}</span>
                                }
                                {/** mostrar hora mensaje, validación para ajustar ubicación mensaje recibido */}
                                <span
                                  className={`text-sm text-slate-500 flex relative ${message.userNameEmisor !== usersChat.userName && "right-[37px]"}`}
                                >{message.fecha}</span>
                              </div>
                              {/* <PDFPreview src={`data:${message.file.type};base64,${arrayBufferToBase64(message.file.data)}`} name={message.file.name}/> */}
                              { /** Validación si vienen archivo adjunto se renderize */
                                message.file?.data &&
                                (
                                  <div className='flex flex-col justify-center items-center w-[100%] h-[30%]'>
                                    {
                                      message.file.type === "application/pdf" && message.file.data instanceof ArrayBuffer ?
                                        <PDFPreview src={arrayBufferToUrl(message.file?.data, message.file?.type)} name={message.file.name}/>:
                                        <img
                                          src={message.file && message.file.data instanceof ArrayBuffer ? `data:${message.file.type};base64,${arrayBufferToBase64(message.file.data)}`: filePreview}
                                          alt={message.file.name}
                                          className='flex w-[auto] object-scale-down'
                                        />
                                    }
                                    {/** descargar archivo adjunto */}
                                    <button  onClick={(event) => {downloadFile(event,message.file)}}
                                      className='flex text-black w-[auto] h-[10px] bg-blue-300-500 p-[8px] mt-[5px] rounded-md items-center'
                                    >Download</button>
                                  </div>
                                )
                              }
                              {/** rederizar mensaje */}
                              <span className='ml-[5px] text-md  flex text-justify'>{message.message}</span>
                            </li>
                          ))
                        }
                        { /** Validación para renderizar si se va enviar archivo adjunto */
                          preview &&
                            (  // *CONTENEDOR PRINCIPAL PREVISUALIZACION ENVIO ARCHIVO ADJUNTO
                              <div className='flex flex-col w-[100%] h-[80%] border-[3px] p-3 rounded-md my-2 justify-around items-center'>
                                {/** cerrar o cancelar previsualización */}
                                <div className='flex mb-[5px] w-[100%]'>
                                  <button
                                    className='flex justify-center items-center w-[20px] h-[20px] font-bold bg-red-500 rounded-md'
                                    onClick={handleCancelUpload}
                                  >x</button>
                                </div>
                                {/** previsualización de archivo adjunto */}
                                {/* <PDFPreview url={filePreview} name={selectedFile.name} /> */}
                                {
                                  selectedFile && (selectedFile.type === "application/pdf") ?
                                      <PDFPreview url={filePreview} name={selectedFile.name} /> :
                                      <img src={filePreview}
                                        className='w-[100%] h-[80%] object-scale-down'
                                      />
                                }
                                {/** icono de enviar */}
                                <div className='flex justify-end w-[100%]'>
                                  <button
                                    className='flex justify-center items-center w-[auto] h-[auto] p-[4px] font-bold bg-green-400 rounded-[50%]'
                                    onClick={handleSubmitFile}
                                  >
                                    <img src={enviarIcon} className='w-[40px] h-[40px] mr-[6px]' />
                                  </button>
                                </div>
                              </div>
                            )
                        }
                      </ul>
                    </div>
                      {/** //*CONTENEDOR DE INPUT PARA TIPEAR MENSAJE */}
                      {/** //*-------------------------------------------- */}
                      <form onSubmit={handleSubmit} className='flex justify-center' >
                        <div className={`flex w-[69%] justify-center h-[60px] mt-[10px] fixed bottom-[3px] p-2 bg-gray-500 ${preview && "hidden"}`}>
                          { // Validación
                            !selectedFile &&
                            (
                              <label className='custom-file-upload flex justify-center mr-[4px]  items-center px-[4px] py-[2px] bg-blue-500 text-white rounded md cursor-pointer'>
                                <input
                                  className='hidden'
                                  onKeyDown={handleKeyDow}
                                  ref={fileInputRef}
                                  type='file' onChange={handleFilechange}
                                />
                                <img src={adjuntarIcon} alt="adjuntar archivo"
                                  className='w-[30px] h-[60px] object-cover'
                                />
                              </label>
                            )
                          }
                          <input
                            type="text"
                            onChange={handleChange}
                            onKeyDown={handleKeyDow}
                            autoComplete='off'
                            placeholder='write your message' name='message' value={message}
                            className='border-2 border-zinc-500 p-2 w-full text-black rounded-lg'
                          />
                          <button
                            type='submit'
                            className='bg-green-500 px-[8px] py-[9px] rounded-[50%] mx-2 hover:scale-110 flex justify-center items-center'
                          >
                            <img src={enviarIcon} className='w-[40px] h-[40px] mr-[6px]' />
                          </button>
                        </div>
                      </form>

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
              ) :
              (
                // *================================================
                // *             CHAT MINIMIZADO
                // *================================================
                <div className='flex justify-around  fixed items-center border-2 bg-white border-blue-950 rounded-md bottom-10 right-10 w-32 h-10'>
                  <span className='font-bold text-black'>Chat</span>
                  <button
                    onClick={toggleMinimize}
                    className='flex justify-center items-center border-2 h-5 w-5 border-blue-950 cursor-pointer'
                  ></button>
                </div>
              )
            }
          </div>
        )
      }
      <Outlet />
    </div>
  )
}

export default Chat