const { Job } = require("../db");

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

module.exports = { postJob, putJob, deleteJob };
