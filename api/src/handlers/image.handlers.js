const { getImages, postImage } = require("../controllers/image.controllers");

const images = async (req, res) => {
  try {
    const foundImages = await getImages();

    if (!foundImages) {
      return { error: "No images found" };
    }

    res.status(200).json(foundImages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

const uploadImage = async (req, res) => {
  const { id, type } = req.user;
  const { filename, path } = req.file;

  try {
    const uploadedImage = await postImage(id, type, filename, path);

    if (!uploadImage) {
      return res.status(500).json({ error: "Database error" });
    }

    if (uploadedImage.error) {
      return res.status(400).json({ error: uploadedImage.error });
    }

    res.status(200).json(uploadedImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { images, uploadImage };
