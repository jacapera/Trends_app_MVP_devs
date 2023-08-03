const { postJob, putJob, deleteJob } = require("../controllers/job.controller");

const createNewJob = async (req, res) => {
  const { id } = req.user;
  const jobData = req.body;

  try {
    const newJob = await postJob({ companyId: id, ...jobData });

    if (!newJob) {
      return res.status(500).json({ error: "The job couldn't be created" });
    }

    if (newJob.error)
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

const editJob = async (req, res) => {
  const { ...jobData } = req.body;
  const { job } = req;

  try {
    const editedJob = await putJob(job, jobData);

    if (!editJob) {
      return res.status(500).json({ error: "The job couldn't be updated" });
    }
    if (editedJob.error) {
      return res.status(500).json({ error: editJob.error });
    }

    return res.status(201).json(editedJob);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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

module.exports = { createNewJob, editJob, removeJob };
