import { createLocalVue, shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("App", () => {
  let store;
  let actions;
  let state;

  beforeEach(() => {
    state = {
      level: 1,
      currentWorkout: {
        status: "NOT_INITIALIZED"
      }
    };
    actions = {
      fetchCurrentWorkout: jest.fn()
    };
    store = new Vuex.Store({
      actions,
      state
    });
  });

  it("renders", () => {
    const wrapper = shallowMount(App, {
      store,
      localVue,
      stubs: ["b-loading"]
    });
    expect(wrapper.html()).toContain('<section id="app"');
  });

  it("shows loading indicator while fetching current workout", () => {
    const wrapper = shallowMount(App, {
      store,
      localVue,
      stubs: ["b-loading"]
    });
    expect(wrapper.find("b-loading-stub").attributes().active).toBeTruthy();
  });

  it("shows no active workout if current workout not found", () => {
    state.currentWorkout = {
      status: "NOT_FOUND"
    };
    const wrapper = shallowMount(App, {
      store,
      localVue,
      stubs: ["b-loading"]
    });
    expect(wrapper.html()).toContain("noactiveworkouts-stub");
  });

  it("shows shows rating when workout is active", () => {
    state.currentWorkout = {
      status: "ACTIVE"
    };
    const wrapper = shallowMount(App, {
      store,
      localVue,
      stubs: ["b-loading"]
    });
    expect(wrapper.html()).toContain("givefeedback-stub");
  });
});
