const { Router } = require("express");
const { createNewJob } = require("../handlers/job.handlers");

const jobRoutes = Router();

jobRoutes.post("/", createNewJob);

module.exports = jobRoutes;
