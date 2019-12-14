//Note! Using Vuex store is totally overkill for this app, not really needed

import Vue from "vue";
import Vuex from "vuex";

import {
  addScore,
  updateScore,
  fetchCurrentWorkout,
  fetchAllRatings
} from "@/firebase/db";
import ratingOptionsByLevel from "@/data/ratings";

Vue.use(Vuex);

const mutation = {
  SET_SELECTED_RATING: "setSelectedRating",
  SET_RATING_ID: "setRatingId",
  ADD_LEVEL: "addLevel",
  SET_CURRENT_WORKOUT: "setCurrentWorkout"
};

export const action = {
  FETCH_RATINGS: "fetchRatings"
};

const state = {
  ratingId: null,
  selectedRating: null,
  level: 0,
  currentWorkout: { status: "NOT_INITIALIZED" }
};

export const mutations = {
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
};

export const actions = {
  async rate({ commit, state }, score) {
    commit(mutation.SET_SELECTED_RATING, score);
    if (state.ratingId) {
      updateScore(score, state.ratingId);
    } else {
      const id = await addScore(score);
      commit(mutation.SET_RATING_ID, id);
      commit(mutation.ADD_LEVEL);
    }
  },
  async fetchCurrentWorkout({ commit }) {
    const workout = await fetchCurrentWorkout();
    commit(mutation.SET_CURRENT_WORKOUT, workout || { status: "NOT_FOUND" });
  },
  async fetchRatings() {
    return await fetchAllRatings();
  }
};

const getters = {
  getRatingOptions: state => {
    return ratingOptionsByLevel[state.level];
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export const localStorageHandler = store => ({ type, payload }, state) => {
  if (type === mutation.SET_CURRENT_WORKOUT) {
    const workoutRating = localStorage.getItem(payload.id);
    if (workoutRating) {
      const workoutRatingParsed = JSON.parse(workoutRating);
      store.commit(mutation.SET_RATING_ID, workoutRatingParsed.ratingId);
      store.commit(
        mutation.SET_SELECTED_RATING,
        workoutRatingParsed.selectedRating
      );
    }
  } else if (type === mutation.SET_SELECTED_RATING) {
    const workoutRating = localStorage.getItem(state.currentWorkout.id);
    const workoutRatingParsed = workoutRating ? JSON.parse(workoutRating) : {};
    workoutRatingParsed.selectedRating = payload;
    localStorage.setItem(
      state.currentWorkout.id,
      JSON.stringify(workoutRatingParsed)
    );
  } else if (type === mutation.SET_RATING_ID) {
    const workoutRating = localStorage.getItem(state.currentWorkout.id);
    const workoutRatingParsed = workoutRating ? JSON.parse(workoutRating) : {};
    workoutRatingParsed.ratingId = payload;
    localStorage.setItem(
      state.currentWorkout.id,
      JSON.stringify(workoutRatingParsed)
    );
  } else if (type === mutation.ADD_LEVEL) {
    localStorage.setItem("level", state.level);
  }
};

//keep store free from localstorage side-effects
store.subscribe(localStorageHandler(store));

export default store;
