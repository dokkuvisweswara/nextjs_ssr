import { createSlice } from '@reduxjs/toolkit';

// export interface ProfileState {
//   name: string
// }

// const initialState: ProfileState = {
//     name: '',
// }
const isSSR = () => typeof localStorage === 'undefined'; 
console.log('isSSR', isSSR());
const somevalue = () => {
   let x=  localStorage.getItem('userName') !== undefined ? localStorage.getItem('userName') : 'null';
   return x;
}
export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: !isSSR() ? somevalue() : 'null' ,
  },
  reducers: {
    SET_PROFILE_NAME: (state, action) => {
        state.name = action.payload;
        console.log('acton', state.name);
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