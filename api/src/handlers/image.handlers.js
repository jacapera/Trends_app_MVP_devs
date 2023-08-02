const { Image } = require("../db");

const images = async (req, res) => {
  Image.findAll()
    .then((images) => {
      res.status(200).json(images);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch images" });
    });
};

const uploadImage = async (req, res) => {
  console.log("req: ", req.file)
  const { filename, path } = req.file;
  Image.create({ filename, filepath: path })
    .then(() => {
      res.status(200).json({ message: "Image uploaded successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to upload image" });
    });
};

module.exports = { images, uploadImage };
