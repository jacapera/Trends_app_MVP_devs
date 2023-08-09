const { Image } = require("../../db");
const path = require("path");
const fs = require("fs");

module.exports = async (imageId, currentUserId, currentUserType) => {
  const foundImage = await Image.findOne({
    where: {
      id: imageId,
    },
  });

  if (!foundImage) {
    return { error: "Image not found" };
  }

  const { userId, CompanyId, adminId } = foundImage;

  if (
    [userId, CompanyId, adminId].includes(currentUserId) ||
    currentUserType === "admin"
  ) {
    const imagePath = path.resolve("src", "uploads", foundImage.filename);

    try {
      await fs.promises.access(imagePath);

      await fs.promises.unlink(imagePath);

      await Image.destroy({
        where: {
          id: imageId,
        },
      });

      return { message: "Image and reference deleted successfully" };
    } catch (err) {
      console.error("Error deleting image:", err);
      return { error: "Error deleting image or reference" };
    }
  }

  return { error: "Forbidden" };
};
