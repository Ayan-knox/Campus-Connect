import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const userMessage = createAsyncThunk('profile/message', async ({ groupId, token }) => {
    try {
        let response = await axios.get(`http://localhost:3000/messages/view?groupId=${groupId}`, {
            headers: {
                Authorization: token,
                Timestamp: new Date().toString()
            }
        });

        console.log("This is the reducer fetching", response)
        return { ...response.data, groupId }

    } catch (error) {
        throw error;
    }
})


const initialState = {
    allUserMessage: [],
    error: null,
    loading: false,
}


export const userMessageSlice = createSlice({
    name: 'userMsg',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(userMessage.fulfilled, (state, action) => {

                const groupId = action.payload.groupId;

                let newMsgObj = {
                    groupId: groupId,
                    messages: []
                }

                newMsgObj.messages = action.payload.messages.map((msgObj, ind) => {

                    let newMsgObj = {
                        timestamp: msgObj.timestamp,
                        msgId: msgObj.messageId,
                        senderId: msgObj.sender.id,
                        content: msgObj.content,
                    };

                    return newMsgObj;
                })

                newMsgObj.messages.sort((a, b) => {
                    return (new Date(a.timestamp) - new Date(b.timestamp));
                })

                let index = state.allUserMessage.findIndex(msgObj => msgObj.groupId === action.payload.groupId);

                if (index !== -1) {

                    let updatedMsgList = [...newMsgObj.messages, ...state.allUserMessage[index].messages];
                    state.allUserMessage[index].messages = updatedMsgList;

                } else {
                    state.allUserMessage.push(newMsgObj);
                }

                state.loading = false;
                state.error = null;
            })

            .addCase(userMessage.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = "Unable to fetch messages";
            });
    },

})


// export const {userMessage} = userMessageSlice.actions;

export default userMessageSlice.reducer;
