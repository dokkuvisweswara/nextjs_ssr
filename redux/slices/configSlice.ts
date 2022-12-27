import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        configData: []
    },
    reducers: {
        SET_CONFIG_DATA: (state, action) => {
            state.configData = action.payload;
            return state;
        }
    }
});

export const { SET_CONFIG_DATA } = configSlice.actions;
export default configSlice.reducer;