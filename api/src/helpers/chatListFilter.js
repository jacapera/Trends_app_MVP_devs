const chatListFilter = (array, searchString) => {
  searchString = searchString.toLowerCase();

  return array.filter((obj) => {
    const name = obj.name.toLowerCase();
    const username = obj.username ? obj.username.toLowerCase() : "";

    return (name.includes(searchString) || (obj.username && username.includes(searchString)));
  });
};

module.exports = chatListFilter;
