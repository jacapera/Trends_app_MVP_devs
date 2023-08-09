const { Job } = require("../../db");

module.exports = async (jobData) => {
  const newJob = await Job.create(jobData);

  return newJob;
};
