const { Job } = require("../db");

const postJob = async (jobData) => {
  try {
    const newJob = await Job.create(jobData);

    return newJob;
  } catch (error) {
    return { error: error.message };
  }
};

const putJob = async (job, jobData) => {
  try {
    const foundJob = job;
    const updatedJob = await foundJob.update(jobData);

    return updatedJob;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteJob = async (id) => {
  try {
    const deletedJob = await Job.destroy({ where: { id } });

    return deletedJob;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { postJob, putJob, deleteJob };
