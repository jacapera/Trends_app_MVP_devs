const { getJobs } = require("../../controllers/search.controllers");

module.exports = async (req, res) => {
  const queryParams = { ...req.query };
  const page = parseInt(queryParams.page) || 1; // Página actual, por defecto 1
  delete queryParams.page;

  try {
    const jobs = await getJobs(queryParams, page);

    if (!jobs) {
      return res.status(500).json({
        error: "No jobs found",
      });
    }

    if (jobs.error)
      return res.status(500).json({
        error: jobs.error,
      });

    res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};