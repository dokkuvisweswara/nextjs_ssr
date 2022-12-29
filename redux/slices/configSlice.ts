import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        configData: [],
        filteredData: []
    },
    reducers: {
        SET_CONFIG_DATA: (state, action) => {
            state.configData = action.payload;
            return state;
        },
        SET_FILTEREDSECTIONS: (state, action) => {
            state.filteredData = action.payload;
            return state;
        }
    }
});

export const { SET_CONFIG_DATA, SET_FILTEREDSECTIONS } = configSlice.actions;
export default configSlice.reducer;