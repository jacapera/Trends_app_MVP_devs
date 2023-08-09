const { Image } = require("../../db");

module.exports = async () => {
  const dbImages = await Image.findAll();

  if (!dbImages) {
    return { error: "No images found" }
  }

  return dbImages;
};
