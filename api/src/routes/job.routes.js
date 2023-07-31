const { Router } = require("express");
const { createNewJob, editJob, removeJob } = require("../handlers/job.handlers");

const jobRoutes = Router();

jobRoutes.post("/", createNewJob);
jobRoutes.put("/:id", editJob);
jobRoutes.delete("/:id", removeJob);

module.exports = jobRoutes;
