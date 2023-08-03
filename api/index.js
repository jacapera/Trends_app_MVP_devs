const { SV_PORT, SV_HOST } = require("./config");
const appSocket = require("./src/app");
const { conn } = require("./src/db");

appSocket.listen(SV_PORT, () => {
  conn.sync({ force: true });
  console.log(`Server listen on http://${SV_HOST}:${SV_PORT}/`);
});
