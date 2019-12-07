//Note! Using Vuex store is totally overkill for this app, not really needed

import Vue from "vue";
import Vuex from "vuex";

import { addScore, updateScore } from "../firebase/db";
import ratingOptionsByLevel from "@/data/ratings";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    ratingId: null,
    selectedRating: null,
    level: 1
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
        updateScore(score, state.ratingId);
      } else {
        addScore(score).then(id => commit("setRatingId", id));
      }
    }
  },
  getters: {
    getRatingOptions: state => {
      return ratingOptionsByLevel[state.level];
    }
  }
});

export default store;
