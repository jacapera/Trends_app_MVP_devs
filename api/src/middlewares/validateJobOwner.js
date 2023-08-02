const { getJobById } = require("../controllers/search.controller");

const validateJobOwner = async (req, res, next) => {
  const { id: companyId } = req.user.dataValues;
  const { id: jobId } = req.params;
  const jobToEditOrDelete = await getJobById(jobId);

  if (!jobToEditOrDelete)
    return res.status(400).json({ error: "Job not found" });

  if (jobToEditOrDelete.error)
    return res.status(500).json({
      error: jobToEditOrDelete.error,
    });

  if (jobToEditOrDelete.companyId !== companyId) {
    return res.status(400).json({ error: "Not authorized" });
  }

  req.job = jobToEditOrDelete;

  next();
};

module.exports = validateJobOwner;
