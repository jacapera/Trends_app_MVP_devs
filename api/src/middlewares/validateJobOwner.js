const { getJobById } = require("../controllers/search.controller");

const validateJobOwner = async (req, res, next) => {
  const { id: companyId } = req.user;
  const { id: jobId } = req.params;
  const { type: userType } = req.user;

  const jobToEditOrDelete = await getJobById(jobId);

  if (!jobToEditOrDelete)
    return res.status(400).json({ error: "Job not found" });

  if (userType === "admin") {
    next();
  }

  if (jobToEditOrDelete.companyId !== companyId) {
    return res.status(400).json({ error: "Not authorized" });
  }

  req.job = jobToEditOrDelete;

  next();
};

module.exports = validateJobOwner;
