import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper  } from "next-redux-wrapper";
import profile from './store/profileSlice';

const combinedReducer = combineReducers({
  profile
});
export const makeStore = () => configureStore({
  reducer: combinedReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export const wrapper = createWrapper(makeStore, { debug: true } );
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// export const wrapper = createWrapper<RootStore>(store);
