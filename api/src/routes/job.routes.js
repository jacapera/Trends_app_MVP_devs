const { Router } = require("express");
const {
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

jobRoutes.post("/:id", validateId, validateCompany, validateSchema(jobSchema), createNewJob);
jobRoutes.put("/:id", validateId, validateJobOwner, validateSchema(jobSchema), editJob);
jobRoutes.delete("/:id", validateId, validateJobOwner, removeJob);

module.exports = jobRoutes;
