const { Image } = require("../../db");

module.exports = async () => {
  const dbImages = await Image.findAll();

  return dbImages;
};
