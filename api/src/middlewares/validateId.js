const validateId = (req, res, next) => {
  const { id } = req.params;

  // Expresión regular para validar un UUIDv4
  const uuidv4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!id || id === undefined)
    return res.status(400).json({
      error: "No ID has been entered",
    });

  // Se comprueba que sea un ID válido
  if (!uuidv4Regex.test(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  next();
}

module.exports = validateId;