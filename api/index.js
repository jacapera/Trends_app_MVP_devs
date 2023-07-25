const { SV_PORT, SV_HOST } = require("./config")
const app = require("./src/app")

app.listen(SV_PORT, () => {
  console.log(`Server listen on http://${SV_HOST}:${SV_PORT}/`);
})