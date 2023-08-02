const { Router } = require("express");
const { images, uploadImage } = require("../handlers/image.handlers");

const imageRouter = Router();

imageRouter.get("/", images);
imageRouter.post("/upload", uploadImage);

module.exports = imageRouter;
