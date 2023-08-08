const getContactData = (data, prop, chat) => {
  const datas = [chat.UserReceived[prop], chat.UserSent[prop]];
  const output = datas.filter((ele) => ele !== data);

  if (!output.length) {
    return datas[0];
  }

  return output[0];
};

module.exports = getContactData;
