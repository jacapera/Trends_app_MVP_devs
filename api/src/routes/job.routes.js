const { Router } = require("express");
const { createNewJob, editJob, removeJob } = require("../handlers/job.handlers");
const validateId = require("../middlewares/validateId");

const jobRoutes = Router();

jobRoutes.post("/", createNewJob);
jobRoutes.put("/:id", validateId, editJob);
jobRoutes.delete("/:id", validateId, removeJob);

module.exports = jobRoutes;
