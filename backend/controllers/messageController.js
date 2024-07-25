const messageService = require('../services/messageService');

const getMessages = (req, res) => {
  const allMessages = {
    messages: messageService.getMessages(),
    serverResponses: messageService.getServerResponses()
  };
  res.json(allMessages);
};

const createMessage = (req, res) => {
  let { message, total } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  if (message.length > 50) {
    message = message.substring(0, 50);
  }

  const timestamp = new Date().toISOString();
  const messageWithTime = { message: message, time: timestamp };
  const removedMessage = messageService.addMessage(messageWithTime);

  let serverResponse = `Message added: ${message}. `;

  if (removedMessage) {
    serverResponse += `Removed message: ${removedMessage.message}.`;
  }

  const serverResponseWithTime = { message: serverResponse, time: timestamp };
  messageService.addServerResponse(serverResponseWithTime);

  const resData = {
    messages: null,
    messageAdded: messageWithTime,
    serverResponse: serverResponseWithTime,
    serverResponses: null
  };

  if (messageService.getLength() !== total + 1 && total !== 9) {
    resData.messages = messageService.getMessages();
    resData.serverResponses = messageService.getServerResponses();
  }

  broadcastUpdate(resData);

  res.status(201).json(messageWithTime);
};

const deleteMessages = (req, res) => {
    messageService.deleteMessages();
    res.status(204).end();
};

function broadcastUpdate(messagesObj) {
  global.wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(messagesObj));
    }
  });
}

module.exports = { getMessages, createMessage, deleteMessages };
