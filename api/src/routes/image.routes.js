const { Router } = require("express");
const { images, imagesByUser, uploadImage, removeImage } = require("../handlers/image.handlers");
const { validateId } = require("../middlewares");
const upload = require("../helpers/imageUploader");

const imageRouter = Router();

imageRouter.get("/", images);
imageRouter.get("/user/:id", validateId, imagesByUser);
imageRouter.post("/upload", upload.single("image"), uploadImage);
imageRouter.delete("/delete/:imageId", removeImage);

module.exports = imageRouter;
