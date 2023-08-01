const { getUserById, getUsers, getJobById, getJobs } = require("../controllers/search.controller");

const searchUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userById = await getUserById(id);
    if (userById && userById.error)
      return res.status(500).json({
        error: userById.error,
      });
    res.status(200).json(userById);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const searchUsers = async (req, res) => {
  const queryParams = { ...req.query };
  const userType = queryParams?.type;

  if (!["student", "professional", "company"].includes(userType)) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  try {
    const users = await getUsers(queryParams, userType);
    if (users && users.error)
      return res.status(500).json({
        error: users.error,
      });
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const searchJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const jobById = await getJobById(id);

    if (!jobById) {
      return res.status(400).json({ error: "Job not found" });
    }
    if (jobById.error)
      return res.status(500).json({
        error: jobById.error,
      });

    res.status(200).json(jobById);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

const searchJobs = async (req, res) => {
  const queryParams = { ...req.query };

  try {
    const jobs = await getJobs(queryParams);
    if (jobs && jobs.error)
      return res.status(500).json({
        error: jobs.error,
      });
    res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = { searchUserById, searchUsers, searchJobById, searchJobs };
