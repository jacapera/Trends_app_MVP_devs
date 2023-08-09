module.exports = async (job, jobData) => {
  const updatedJob = await job.update(jobData);

  return updatedJob;
};
