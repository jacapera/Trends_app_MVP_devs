const { Router } = require("express");
const { createNewJob, removeJob } = require("../handlers/job.handlers");

const jobRoutes = Router();

jobRoutes.post("/", createNewJob);
jobRoutes.delete("/:id", removeJob);

module.exports = jobRoutes;
