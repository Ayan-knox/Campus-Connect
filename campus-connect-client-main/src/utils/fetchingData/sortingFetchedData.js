const sortingData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        const hasRecentMessageA = !!a.recentMessage;
        const hasRecentMessageB = !!b.recentMessage;

        // If both have recentMessage or both don't have it, compare timestamps
        if (hasRecentMessageA === hasRecentMessageB) {
            
            const timestampA = hasRecentMessageA ? new Date(a.recentMessage.timestamp) : new Date(a.created_at);
            const timestampB = hasRecentMessageB ? new Date(b.recentMessage.timestamp) : new Date(b.created_at);

            return timestampB - timestampA;
        } else {
            // If only one has recentMessage, prioritize it
            return hasRecentMessageA ? -1 : 1;
        }
    });
    return sortedData;
};

export { sortingData };
