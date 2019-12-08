jest.mock("@/firebase/db");

import { mutations, actions, localStorageHandler } from "@/store";

describe("mutations", () => {
  it("addLevel max level is 3", () => {
    const state = { level: 2 };
    mutations.addLevel(state);
    expect(state.level).toBe(3);
    mutations.addLevel(state);
    expect(state.level).toBe(3);
  });
});

describe("actions", () => {
  it("rate sets selected rating, rating id and adds level on new rating", async () => {
    const state = { ratingId: null };
    const commit = jest.fn();
    await actions.rate({ state, commit }, 1);
    expect(commit.mock.calls.length).toBe(3);
    expect(commit.mock.calls[0][0]).toBe("setSelectedRating");
    expect(commit.mock.calls[0][1]).toBe(1);
    expect(commit.mock.calls[1][0]).toBe("setRatingId");
    expect(commit.mock.calls[2][0]).toBe("addLevel");
  });
  it("rate sets selected rating, and updates rating when already rated", async () => {
    const state = { ratingId: "1" };
    const commit = jest.fn();
    await actions.rate({ state, commit }, 1);
    expect(commit.mock.calls.length).toBe(1);
    expect(commit.mock.calls[0][0]).toBe("setSelectedRating");
    expect(commit.mock.calls[0][1]).toBe(1);
  });
});

describe("store.subscribe() localStorage", () => {
  let store = { commit: jest.fn() };
  let localStorageHandlerWithMockStore;

  beforeEach(() => {
    localStorage.clear();
    localStorageHandlerWithMockStore = localStorageHandler(store);
  });

  it("adds level on add level to localStorage", async () => {
    const state = { level: 1 };
    localStorageHandlerWithMockStore({ type: "addLevel" }, state);
    expect(localStorage.__STORE__["level"]).toBe("1");
  });
  it("stores workout rating to localstorage", async () => {
    const state = { currentWorkout: { id: "id" } };
    localStorageHandlerWithMockStore(
      { type: "setSelectedRating", payload: 1 },
      state
    );
    expect(localStorage.__STORE__["id"]).toBe('{"selectedRating":1}');
  });
  it("stores workout rating id to localstorage", async () => {
    const state = { currentWorkout: { id: "id" } };
    localStorageHandlerWithMockStore(
      { type: "setRatingId", payload: 1 },
      state
    );
    expect(localStorage.__STORE__["id"]).toBe('{"ratingId":1}');
  });
  it("commits rating id and selected rating on current workout fetch type", async () => {
    const state = {};
    localStorage.__STORE__["id"] = JSON.stringify({
      ratingId: 1,
      selectedRating: 2
    });
    localStorageHandlerWithMockStore(
      { type: "setCurrentWorkout", payload: { id: "id" } },
      state
    );
    expect(store.commit.mock.calls.length).toBe(2);
    expect(store.commit.mock.calls[0][0]).toBe("setRatingId");
    expect(store.commit.mock.calls[0][1]).toBe(1);
    expect(store.commit.mock.calls[1][0]).toBe("setSelectedRating");
    expect(store.commit.mock.calls[1][1]).toBe(2);
  });
});
