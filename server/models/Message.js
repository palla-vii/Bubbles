export const messages = [];
export const addMessage = (message) => {
    messages.push(message);
    return message;
};
export const getMessagesByChatIdRoom = (room) => {
    return messages.filter((msg) => msg.room === room);
};
