const { Router } = require("express");
<<<<<<< HEAD
const { createNewJob, editJob, removeJob } = require("../handlers/job.handlers");
=======
const {
  createNewJob,
  editJob,
  removeJob,
} = require("../handlers/job.handlers");
>>>>>>> 036c58092a065ae28621c9e8ad95ad3dabd69405
const validateCompany = require("../middlewares/validateCompany");
const validateId = require("../middlewares/validateId");
const validateJobOwner = require("../middlewares/validateJobOwner");
const validateSchema = require("../middlewares/validateInfo");
const { jobSchema } = require("../schemas/index.schemas");

const jobRoutes = Router();

<<<<<<< HEAD
jobRoutes.post("/", validateCompany, createNewJob);
jobRoutes.put("/:id", validateId, validateJobOwner, editJob);
=======
jobRoutes.post("/", validateCompany, validateSchema(jobSchema), createNewJob);
jobRoutes.put("/:id", validateId, validateJobOwner, validateSchema(jobSchema), editJob);
>>>>>>> 036c58092a065ae28621c9e8ad95ad3dabd69405
jobRoutes.delete("/:id", validateId, validateJobOwner, removeJob);

module.exports = jobRoutes;
