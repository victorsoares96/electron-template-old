import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HomeState = {
  message: string;
};

const initialState: HomeState = {
  message:
    typeof window.api.store.initial()['motd'] !== 'undefined'
      ? window.api.store.initial()['motd']
      : 'Hello and welcome to the template!',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { changeMessage } = homeSlice.actions;

export default homeSlice.reducer;
