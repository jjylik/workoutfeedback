import { createLocalVue, shallowMount } from "@vue/test-utils";
import GiveFeedback from "@/components/GiveFeedback.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("GiveFeedback", () => {
  let store;
  let actions;
  let state;

  beforeEach(() => {
    state = {
      ratingId: null,
      selectedRating: null
    };
    actions = {
      rate: jest.fn()
    };
    store = new Vuex.Store({
      actions,
      state
    });
  });

  it("renders", () => {
    const wrapper = shallowMount(GiveFeedback, {
      store,
      localVue,
      stubs: ["b-notification"]
    });
    expect(wrapper.html()).toContain('<div class="container">');
  });

  it("triggers store action on click", () => {
    const wrapper = shallowMount(GiveFeedback, {
      store,
      localVue,
      stubs: ["b-notification"]
    });
    const rating = wrapper.find(".rating span");
    rating.trigger("click"); // click first item
    expect(actions.rate.mock.calls[0][1]).toBe(1);
  });

  it("shows already selected rating", () => {
    state.selectedRating = 2;
    const wrapper = shallowMount(GiveFeedback, {
      store,
      localVue,
      stubs: ["b-notification"]
    });
    const selectedRating = wrapper.find(".rating span.active");
    expect(selectedRating.text()).toContain("😺");
    expect(wrapper.find(".thank-you-notification").exists()).toBeTruthy();
  });
});
