const { Image } = require("../../db");
const path = require("path");
const fs = require("fs");

module.exports = async (imageId) => {
  const foundImage = await Image.findOne({
    where: {
      id: imageId,
    },
  });

  if (!foundImage) {
    return { error: "Image not found" };
  }

  const imagePath = path.resolve("src", "uploads", foundImage.filename);

  fs.access(imagePath, fs.constants.F_OK, async (err) => {
    if (err) {
      return { error: "Image not found" };
    }

    fs.unlink(imagePath, async (err) => {
      if (err) {
        return { error: "Error deleting image" };
      }

      try {
        await Image.destroy({
          where: {
            id: imageId,
          },
        });

        return { message: "Image and reference deleted successfully" };
      } catch (err) {
        return { error: "Error deleting image reference from the database" };
      }
    });
  });
};
