const controllers = require('../controllers');
const express = require('express');
const { userAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.get("/", userAuthenticated, async (req, res) => {
  try {
    return res.status(200).json(await controllers.getChats());
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
});

router.post('/create', userAuthenticated, async (req, res) => {
  try {
    console.log(req.body);
    return res.status(200).json(await controllers.postChat(req.body));
  } catch (error) {
    console.log(error)
    return error.statusCode
      ? res.status(error.statusCode).json({message:error.message})
      : res.status(500).json({message:error.message});
  }
});

module.exports = router;