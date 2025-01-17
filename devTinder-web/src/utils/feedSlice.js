import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeedUser: (state, action) => {
            const newArray = state.filter(user => user._id !== action.payload);
            return newArray;
        },
        removeFeed: (state, action) => {
            return null;
        },
    },
});

export const { addFeed, removeFeedUser, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;