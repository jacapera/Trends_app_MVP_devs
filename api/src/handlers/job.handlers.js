const { postJob, deleteJob } = require("../controllers/job.controller");

const createNewJob = async (req, res) => {
  const jobData = req.body;

  try {
    const newJob = await postJob(jobData);

    if (newJob && newJob.error)
      return res.status(500).json({
        error: newJob.error,
      });

    return res.status(201).json(newJob);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const removeJob = async (req, res) => {
  const { id } = req.params;

  try {
    const removedJob = await deleteJob(id);

    if (removedJob === 0)
      return res.status(400).json({ error: "Job not found" });

    res.status(200).json({ message: "Job successfully removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewJob, removeJob };
