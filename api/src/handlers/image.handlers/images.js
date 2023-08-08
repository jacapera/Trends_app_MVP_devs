const { getImages } = require("../../controllers/image.controllers");

module.exports = async (req, res) => {
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
