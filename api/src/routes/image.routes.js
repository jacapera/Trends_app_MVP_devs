const { Router } = require("express");
const { images, uploadImage } = require("../handlers/image.handlers");
const upload = require("../helpers/imageUploader");

const imageRouter = Router();

imageRouter.get("/", images);
imageRouter.post("/upload", upload.single("image"), uploadImage);

module.exports = imageRouter;
