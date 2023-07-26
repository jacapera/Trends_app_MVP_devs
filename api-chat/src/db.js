require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/trends`, {
  logging: false,
  native: false
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


console.log(sequelize.models)
const { User, Message, Chat } = sequelize.models;


// Relación entre Usuario y Chat (Participantes):
/**
 * Cada usuario puede participar en varios Chats
 * Cada chat puede tner varios usuarios
 * *(Muchos a Muchos)
 */
Chat.belongsToMany(User, { through: 'Usuario_chat', as: 'participantes', foreignKey: 'chat_id' });
User.belongsToMany(Chat, { through: 'Usuario_chat', as: 'chats', foreignKey: 'user_id' });

// Relación entre Chat y Mensaje (Mensajes enviados):
/**
 * Cada chat puede contener varios mensajes
 * cada mensaje pertenece a un solo chat
 * *(Uno a Muchos)
 */
Chat.hasMany(Message, { as: 'mensajes', foreignKey: 'chat_id' });
Message.belongsTo(Chat, { as: 'chat', foreignKey: 'chat_id' });

// Relación entre Usuario y Mensaje (Autor del mensaje):
/**
 * Cada usuario puede enviar varios mensajes
 * Cada mensaje es enviado por un único usuario
 * (Uno a Muchos)
 */
User.hasMany(Message, { as: 'mensajesEnviados', foreignKey: 'user_id' });
Message.belongsTo(User, { as: 'autor', foreignKey: 'user_id' });

// Relación entre Chat y Usuario (Propiedad de chat privado):
Chat.belongsTo(User, { as: 'emisor', foreignKey: 'emisorId' });
Chat.belongsTo(User, { as: 'receptor', foreignKey: 'receptorId' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
