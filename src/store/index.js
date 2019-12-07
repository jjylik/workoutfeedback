//Note! Using Vuex store is totally overkill for this app, not really needed

import Vue from "vue";
import Vuex from "vuex";

import { addScore, updateScore, fetchCurrentWorkout } from "../firebase/db";
import ratingOptionsByLevel from "@/data/ratings";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    ratingId: null,
    selectedRating: null,
    level: 0,
    currentWorkout: { status: "NOT_INITIALIZED" }
  },
  mutations: {
    setRatingId(state, ratingId) {
      state.ratingId = ratingId;
    },
    setSelectedRating(state, score) {
      state.selectedRating = score;
    },
    addLevel(state) {
      state.level = state.level >= 3 ? 3 : state.level + 1;
    },
    setLevel(state, level) {
      state.level = level;
    },
    setCurrentWorkout(state, currentWorkout) {
      state.currentWorkout = currentWorkout;
    }
  },
  actions: {
    async rate({ commit, state }, score) {
      commit("setSelectedRating", score);
      if (state.ratingId) {
        updateScore(score, state.ratingId);
      } else {
        const id = await addScore(score);
        commit("setRatingId", id);
        commit("addLevel");
      }
    },
    async fetchCurrentWorkout({ commit }) {
      const workout = await fetchCurrentWorkout();
      commit("setCurrentWorkout", workout || { status: "NOT_FOUND" });
    }
  },
  getters: {
    getRatingOptions: state => {
      return ratingOptionsByLevel[state.level];
    }
  }
});

//keep store free from localstorage side-effects
store.subscribe(({ type, payload }, state) => {
  if (type === "setCurrentWorkout") {
    const workoutRating = localStorage.getItem(payload.id);
    if (workoutRating) {
      const workoutRatingParsed = JSON.parse(workoutRating);
      store.commit("setRatingId", workoutRatingParsed.ratingId);
      store.commit("setSelectedRating", workoutRatingParsed.selectedRating);
    }
  } else if (type === "setSelectedRating") {
    const workoutRating = localStorage.getItem(state.currentWorkout.id);
    const workoutRatingParsed = workoutRating ? JSON.parse(workoutRating) : {};
    workoutRatingParsed.selectedRating = payload;
    localStorage.setItem(
      state.currentWorkout.id,
      JSON.stringify(workoutRatingParsed)
    );
  } else if (type === "setRatingId") {
    const workoutRating = localStorage.getItem(state.currentWorkout.id);
    const workoutRatingParsed = workoutRating ? JSON.parse(workoutRating) : {};
    workoutRatingParsed.ratingId = payload;
    localStorage.setItem(
      state.currentWorkout.id,
      JSON.stringify(workoutRatingParsed)
    );
  } else if (type === "addLevel") {
    localStorage.setItem("level", state.level + 1);
  }
});

export default store;
