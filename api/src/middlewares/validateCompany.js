const validateCompany = async (req, res, next) => {
  try {
    const { type: userType, id: userId } = req.user;
    const { id } = req.params;

    if (userType === "admin") {
      // Si es admin, pasa al siguiente middleware sin realizar más comprobaciones.
      next();
    } else if (userType !== "company" || userId !== id) {
      // Si no es admin y no cumple las condiciones, responde con un error.
      return res.status(400).json({ error: "Invalid or not authorized user" });
    } else {
      // Si no se cumple ninguna de las condiciones anteriores,
      // es un usuario tipo company válido.
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: "Company validation error" });
  }
};

module.exports = validateCompany;
