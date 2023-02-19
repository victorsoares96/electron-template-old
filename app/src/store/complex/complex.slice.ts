import { createSlice } from '@reduxjs/toolkit';

export type ComplexState = Array<{
  id: number;
  food: {
    name: string;
    taste: string;
  };
}>;

const foods = ['pineapple', 'kiwi', 'grapes', 'orange'];
const taste = ['great', 'poor', 'average', 'good', 'superb'];

const index = <T = unknown>(array: Array<T>) =>
  Math.floor(Math.random() * array.length);
const randomFood = () => foods[index(foods)];
const randomTaste = () => taste[index(taste)];

const initialState: ComplexState = [
  {
    id: 1,
    food: {
      name: 'apple',
      taste: 'great',
    },
  },
];

const complexSlice = createSlice({
  name: 'complex',
  initialState,
  reducers: {
    add: state => {
      state.push({
        id: state.length + 1,
        food: {
          name: randomFood(),
          taste: randomTaste(),
        },
      });
    },
    remove: state => {
      const randIndex = Math.floor(Math.random() * state.length);
      state.splice(randIndex, 1);
    },
  },
});

export const { add, remove } = complexSlice.actions;

export default complexSlice.reducer;
