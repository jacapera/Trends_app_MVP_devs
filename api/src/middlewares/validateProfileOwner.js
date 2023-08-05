const { getUserById } = require("../controllers/search.controller");

const validateProfileOwner = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: profileId } = req.params;
  const { type: userType } = req.user;

  const profileToEdit = await getUserById(profileId);

  if (!profileToEdit){
    return res.status(400).json({ error: "User not found" });
  }
  
    req.profile = profileToEdit;

  if (userType === "admin") {
    // Si es admin, pasa al siguiente middleware sin realizar más comprobaciones.
    next();
  } else if (profileToEdit.id !== userId) {
    // Si no es admin y el usuario no es el dueño del perfil, responde con un error.
    return res.status(400).json({ error: "Not authorized" });
  } else {
    // Si no se cumple ninguna de las condiciones anteriores, 
    // el usuario es el dueño del perfil.
    next();
  }
};

module.exports = validateProfileOwner;
