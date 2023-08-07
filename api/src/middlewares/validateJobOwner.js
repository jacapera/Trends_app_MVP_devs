const { getJobById } = require("../controllers/search.controller");

const validateJobOwner = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const { type: userType, id: companyId } = req.user;

    const jobToEditOrDelete = await getJobById(jobId);

    if (!jobToEditOrDelete) {
      return res.status(400).json({ error: "Job not found" });
    }

    req.job = jobToEditOrDelete;

    if (userType === "admin") {
      // Si es admin, pasa al siguiente middleware sin realizar más comprobaciones.
      next();
    } else if (jobToEditOrDelete.companyId !== companyId) {
      // Si no es admin y el usuario no es dueño del trabajo, responde con un error.
      return res.status(400).json({ error: "Not authorized" });
    } else {
      // Si no se cumple ninguna de las condiciones anteriores,
      // el usuario es el dueño del trabajo.
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: "Job validation error" });
  }
};

module.exports = validateJobOwner;
