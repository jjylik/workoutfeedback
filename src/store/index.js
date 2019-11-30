import Vue from "vue";
import Vuex from "vuex";

import { ratingsCollection } from "../firebase/db";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ratingId: null,
    selectedRating: null
  },
  mutations: {
    setRatingId(state, ratingId) {
      state.ratingId = ratingId;
    },
    setSelectedScore(state, score) {
      state.selectedRating = score;
    }
  },
  actions: {
    rate({ commit, state }, score) {
      commit("setSelectedScore", score);
      if (state.ratingId) {
        ratingsCollection.doc(state.ratingId).set({
          score
        });
      } else {
        ratingsCollection
          .add({
            score
          })
          .then(result => commit("setRatingId", result.id));
      }
    }
  }
});
