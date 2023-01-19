import { configureStore, combineReducers, AnyAction, createStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper  } from "next-redux-wrapper";
import profile from './slices/profileSlice';
import config from './slices/configSlice';

const combinedReducer = combineReducers({
  profile,
  config
});

const reducer:any = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore(
    {reducer},
  );
// Infer the `RootState` and `AppDispatch` types from the store itself
export const wrapper = createWrapper(makeStore, { debug: true } );
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// export const wrapper = createWrapper<RootStore>(store);