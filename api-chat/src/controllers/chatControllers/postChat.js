const { Chat, Message, User } = require('../../db');

const postChat = async (chat) => {
  const { type_chat, name, description, participantes } = chat;
  if(type_chat === 'privado' && (!participantes || participantes.lenght !== 2)) {
    const error = new Error('Un chat privado debe tener exactamente 2 participantes');
    error.statusCode = 400;
    throw error;
  }
  if (type_chat === 'grupal' && (!participantes || participantes.lenght < 3 )) {
    const error = new Error('Un chat grupal debe tener al menos 3 participantes');
    error.statusCode = 400;
    throw error;
  }
  const usuarios = await User.findAll({ where:{user_id: participantes}});
  if (usuarios.lenght !== participantes.lenght) {
    const error = new Error('Alguno de los participantes no existe');
    error.statusCode = 400;
    throw error;
  }
  const newChat = await Chat.create({ type_chat, name, description });
  if(type_chat === 'privado'){
    await chat.setParticipantes(participantes);
  } else if(type_chat === 'grupal') {
    await chat.addParticipantes(participantes);
  }

  return newChat;
}

module.exports = postChat;