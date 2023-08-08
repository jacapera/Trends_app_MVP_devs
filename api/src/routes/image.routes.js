const { Router } = require("express");
const { images, uploadImage, removeImage } = require("../handlers/image.handlers");
const upload = require("../helpers/imageUploader");

const imageRouter = Router();

imageRouter.get("/", images);
imageRouter.post("/upload", upload.single("image"), uploadImage);
imageRouter.delete("/delete/:imageId", removeImage);

module.exports = imageRouter;
