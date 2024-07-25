class MessageService {
    constructor() {
        this.messages = [];
        this.serverResponses = [];
        this.maxMessages = 9;
    }

    addMessage(message) {
        let removedMessage = null;
        if (this.messages.length >= this.maxMessages) {
            removedMessage = this.messages.shift();
        }

        this.messages.push(message);
        return removedMessage;
    }

    getMessages() {
        return this.messages;
    }

    getServerResponses() {
        return this.serverResponses;
    }

    addServerResponse(response) {
        if (this.serverResponses.length >= this.maxMessages) {
            this.serverResponses.shift();
        }

        this.serverResponses.push(response);
        return this.serverResponses;
    }

    getLength() {
        return this.messages.length;
    }

    deleteMessages() {
        this.messages = [];
        this.serverResponses = [];
    }
}

module.exports = new MessageService();
