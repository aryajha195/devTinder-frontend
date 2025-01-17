import { createSlice } from "@reduxjs/toolkit";

const ConnectionssSlice = createSlice({
    name: 'Connections',
    initialState: null,
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConnections: (state, action) => null
    },
});

export const { addConnections, removeConnections } = ConnectionssSlice.actions;

export default ConnectionssSlice.reducer;