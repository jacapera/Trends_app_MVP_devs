const { postJob } = require("../../controllers/job.controllers");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const jobData = req.body;

    const newJob = await postJob({ companyId: id, ...jobData });

    if (!newJob) {
      return res.status(500).json({ error: "The job couldn't be created" });
    }

    return res.status(201).json(newJob);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
