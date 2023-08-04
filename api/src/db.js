require("dotenv").config();
const { Sequelize } = require("sequelize");
const SequelizeSimpleCache = require("sequelize-simple-cache");
const fs = require("fs");
const path = require("path");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = require("../config");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User: initUser,
  Company: initCompany,
  Job: initJob,
  Image: initImage,
  Chat: initChat,
  Message: initMessage,
  Admin: initAdmin,
} = sequelize.models;

// Se setea la configuración del caché de Sequelize
const cache = new SequelizeSimpleCache({
  User: { ttl: 15 * 60 }, // 15 minutos
  Company: { ttl: 15 * 60 },
  Job: { ttl: 30 * 60 },
  Image: { ttl: 60 * 60 },
  Chat: { ttl: 60 },
  Message: { ttl: 33 },
  Admin: { ttl: 15 },
});

// Se inicializan los modelos con el caching activado
const User = cache.init(initUser);
const Company = cache.init(initCompany);
const Job = cache.init(initJob);
const Image = cache.init(initImage);
const Chat = cache.init(initChat);
const Message = cache.init(initMessage);
const Admin = cache.init(initAdmin);

Company.hasMany(Job);
Job.belongsTo(Company);

User.hasMany(Image);
Image.belongsTo(User);

Company.hasMany(Image);
Image.belongsTo(Company);

// ------- Relaciones para el chat --------------
// Definición de la relación entre User y Chat
User.hasMany(Chat, { foreignKey: 'user1_id', as: 'ChatsSent', onDelete: 'CASCADE' });
User.hasMany(Chat, { foreignKey: 'user2_id', as: 'ChatsReceived', onDelete: 'CASCADE' });
Chat.belongsTo(User, { foreignKey: 'user1_id', as: 'UserSent' });
Chat.belongsTo(User, { foreignKey: 'user2_id', as: 'UserReceived' });

// Definición de la relación entre Chat y Message
Chat.hasMany(Message, { foreignKey: 'chat_id', onDelete: 'CASCADE' });
Message.belongsTo(Chat, { foreignKey: 'chat_id', onDelete: 'CASCADE' });
Message.belongsTo(User, { foreignKey: 'sender_id', onDelete: 'CASCADE' });

//User.belongsToMany(Chat, { through: 'group_participants', foreignKey: 'user_id', otherKey: 'group_id', as: 'GroupChats' });

//Chat.belongsToMany(User, { through: 'group_participants', foreignKey: 'group_id', otherKey: 'id', as: 'Participants' });

module.exports = {
  User,
  Company,
  Job,
  Image,
  Chat,
  Message,
  Admin,
  conn: sequelize,
};
