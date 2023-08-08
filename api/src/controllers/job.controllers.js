const { Job } = require("../db");

const getOwnJobs = async (companyId) => {
  const ownJobs = await Job.findAll({
    where: { companyId },
  });

  if (!ownJobs || !ownJobs.length) {
    return { error: "No jobs found" };
  }

  return ownJobs;
};

const postJob = async (jobData) => {
  const newJob = await Job.create(jobData);

  return newJob;
};

const putJob = async (job, jobData) => {
  const updatedJob = await job.update(jobData);

  return updatedJob;
};

const deleteJob = async (id) => {
  const deletedJob = await Job.destroy({ where: { id } });

  return deletedJob;
};

module.exports = { getOwnJobs, postJob, putJob, deleteJob };
