const profile = async (req, res) => {
  const { user } = req;
  // console.log(user);
  try {
    console.log("user profile, route protected.");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { profile };
