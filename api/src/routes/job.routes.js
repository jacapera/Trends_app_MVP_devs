const { Router } = require("express");
const { createNewJob, editJob, removeJob } = require("../handlers/job.handlers");
const validateCompany = require("../middlewares/validateCompany");
const validateId = require("../middlewares/validateId");
const validateJobOwner = require("../middlewares/validateJobOwner");

const jobRoutes = Router();

jobRoutes.post("/", validateCompany, createNewJob);
jobRoutes.put("/:id", validateId, validateJobOwner, editJob);
jobRoutes.delete("/:id", validateId, validateJobOwner, removeJob);

module.exports = jobRoutes;
