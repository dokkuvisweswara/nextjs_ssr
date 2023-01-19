import { createSlice } from '@reduxjs/toolkit';

// export interface ProfileState {
//   name: string
// }

// const initialState: ProfileState = {
//     name: '',
// }
const isSSR = () => typeof localStorage === 'undefined';
const somevalue = () => {
   let x=  localStorage.getItem('userName') !== undefined ? localStorage.getItem('userName') : 'null';
   return x;
}
export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: !isSSR() ? somevalue() : 'null' ,
    // name: null
  },
  reducers: {
    SET_PROFILE_NAME: (state, action) => {
        state.name = action.payload;
        return state
      },
//     getProfileName: (state, action: PayloadAction<any>) => {
//       console.log('acton', action);      
//       state.name = action.payload;
//     }
  },
});

// Action creators are generated for each case reducer function
export const { SET_PROFILE_NAME } = profileSlice.actions;
export default profileSlice.reducer;