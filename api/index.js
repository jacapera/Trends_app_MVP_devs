const { SV_PORT, SV_HOST } = require("./config")
const app = require("./src/app");
const { conn } = require("./src/db");

app.listen(SV_PORT, () => {
  conn.sync({force:true})
  console.log(`Server listen on http://${SV_HOST}:${SV_PORT}/`);
})