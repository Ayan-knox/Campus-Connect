const updateMessages = (prevMessages, newMessages) => {

    const uniqueMessages = newMessages.filter((newMessage) => {
        return !prevMessages.some(
            (prevMessage) =>
                prevMessage.timestamp === newMessage.timestamp &&
                prevMessage.sender.id === newMessage.sender.id
        );
    });

    const combinedMessages = [...prevMessages, ...uniqueMessages];

    const sortedMessages = combinedMessages.sort((a, b) => {
        const timestampA = new Date(a.timestamp).getTime();
        const timestampB = new Date(b.timestamp).getTime();
        return timestampA - timestampB;
    });

    return sortedMessages;
};

export {updateMessages}