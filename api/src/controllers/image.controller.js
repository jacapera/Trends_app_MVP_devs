const { Image } = require("../db");

const getImages = async () => {
  const dbImages = await Image.findAll();

  return dbImages;
};

const postImage = async (id, type, filename, path) => {
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
};

module.exports = { getImages, postImage };
