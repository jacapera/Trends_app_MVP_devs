const decryptMessage = require("./decryptMessage");

const messageFormatter = (messages) => {
  let inputMessages = Array.isArray(messages) ? messages : [messages];

  let outputMessages = [];

  for (const message of inputMessages) {
    const plainMessage = message.toJSON();

    const outputMessage = {
      userId: plainMessage.user?.id,
      username: plainMessage.user?.username,
      profile_image: plainMessage.user?.profile_image,
      messageId: plainMessage.message_id,
      createdAt: plainMessage.createdAt,
      content: decryptMessage(plainMessage.content),
      messageStatus: plainMessage.messageStatus,
    };
    outputMessages.push(outputMessage);
  }

  outputMessages = outputMessages.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return outputMessages;
};

module.exports = messageFormatter;
