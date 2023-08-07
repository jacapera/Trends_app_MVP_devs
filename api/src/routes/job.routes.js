const { Router } = require("express");
const {
  ownJobs,
  createNewJob,
  editJob,
  removeJob,
} = require("../handlers/job.handlers");
const validateCompany = require("../middlewares/validateCompany");
const validateId = require("../middlewares/validateId");
const validateJobOwner = require("../middlewares/validateJobOwner");
const validateSchema = require("../middlewares/validateInfo");
const { jobSchema } = require("../schemas/index.schemas");

const jobRoutes = Router();

jobRoutes.get("/", ownJobs);
jobRoutes.post("/:id", validateId, validateCompany, validateSchema(jobSchema), createNewJob);
jobRoutes.put("/:id", validateId, validateJobOwner, editJob);
jobRoutes.delete("/:id", validateId, validateJobOwner, removeJob);

module.exports = jobRoutes;
