const { Image } = require("../db");

const getImages = async () => {
  const dbImages = await Image.findAll();

  return dbImages;
};

const postImage = async (id, type, filename, path) => {
    let typeOfId;

    if (["student", "professional"].includes(type)) {
      typeOfId = "userId";
    } else if (type === "company") {
      typeOfId = "companyId";
    } else typeOfId = "adminId"

    const savedImage = await Image.create({
      [typeOfId]: id,
      filename,
      filepath: path,
    });

    if (!savedImage) {
      return { error: "Failed to upload image" };
    }

    return { imagePath: path };
};

module.exports = { getImages, postImage };
