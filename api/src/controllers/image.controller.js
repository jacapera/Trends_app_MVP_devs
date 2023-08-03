const { Image } = require("../db");

const getImages = async () => {
  try {
    const dbImages = await Image.findAll();

    if (!dbImages) {
      return { error: "No images found" };
    }

    return dbImages;
  } catch (error) {
    return { error: "Database error" };
  }
};

const postImage = async (id, type, filename, path) => {
  try {
    let typeOfId;

    if (["student", "professional"].includes(type.toLowerCase())) {
      typeOfId = "userId";
    } else typeOfId = "companyId";

    const savedImage = await Image.create({
      [typeOfId]: id,
      filename,
      filepath: path,
    });

    if (!savedImage) {
      return { error: "Failed to upload image" };
    }

    return { message: "Image uploaded successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { getImages, postImage };
