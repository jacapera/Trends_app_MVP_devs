const {
  getOwnJobs,
  postJob,
  putJob,
  deleteJob,
} = require("../controllers/job.controllers");

const ownJobs = async (req, res) => {
  try {
    const { id: companyId, type } = req.user;

    if (type !== "company") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const foundJobs = await getOwnJobs(companyId);

    if (foundJobs?.error) {
      return res.status(400).json({ error: foundJobs.error });
    }

    return res.status(200).json(foundJobs);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const createNewJob = async (req, res) => {
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

const editJob = async (req, res) => {
  try {
    const jobData = req.body;
    const { job } = req;
    const editedJob = await putJob(job, jobData);

    if (!editedJob) {
      return res.status(500).json({ error: "The job couldn't be updated" });
    }

    return res.status(201).json(editedJob);
  } catch (error) {
    return res.status(500).json({ error: "Database error" });
  }
};

const removeJob = async (req, res) => {
  try {
    const { id } = req.params;

    const removedJob = await deleteJob(id);

    if (removedJob === 0)
      return res.status(400).json({ error: "Job not found" });

    res.status(200).json({ message: "Job successfully removed" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { ownJobs, createNewJob, editJob, removeJob };
