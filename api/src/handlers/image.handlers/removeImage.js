const { deleteImage } = require("../../controllers/image.controllers");

module.exports = async (req, res) => {
  try {
    const { imageId } = req.params;

    const removedImage = await deleteImage(imageId);

    if (removedImage?.error) {
      return res.status(400).json({ error: removedImage.error });
    }

    return res
      .status(200)
      .json({ message: "Image and reference deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error deleting image reference from the database" });
  }
};
