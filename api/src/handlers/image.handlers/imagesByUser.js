const { getImagesbyUser } = require("../../controllers/image.controllers");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: UserId, type: UserType } = req.user;
    const foundImages = await getImagesbyUser(id, UserId, UserType);

    if (foundImages?.error) {
      return res.status(400).json({ error: foundImages.error });
    }

    res.status(200).json(foundImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
