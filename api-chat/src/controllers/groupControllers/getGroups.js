const { Group } = require('../../db');

const getGroups = async () => {
  const groups = await Group.findAll({})
};


module.exports = getGroups