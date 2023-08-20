import { defineStore } from 'pinia';
import peopleRecords from './people.csv';

export const usePeopleStore = defineStore({
  id: 'people',
  state: () => ({
    people: peopleRecords,
  }),
  getters: {
    peopleCount: (state) => {
      return state.people.length;
    },
  },
  actions: {},
});
