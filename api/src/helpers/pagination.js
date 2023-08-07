const pagination = async (data, page) => {
  const perPage = 10; // Cantidad de elementos por página
  const startIndex = (page - 1) * perPage;
  const EndIndex = startIndex + perPage;

  const elePerPage = data.slice(startIndex, EndIndex);

  return elePerPage;
};

module.exports = pagination;