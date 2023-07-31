const postJob = require("../controllers/job.controller");

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

module.exports = { createNewJob };
