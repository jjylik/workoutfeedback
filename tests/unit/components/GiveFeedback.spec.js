import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import GiveFeedback from "@/components/GiveFeedback.vue";
import ratings from "@/data/ratings";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("GiveFeedback", () => {
  let store;
  let actions;
  let state;
  let getters;

  beforeEach(() => {
    state = {
      ratingId: null,
      level: 1,
      selectedRating: null
    };
    actions = {
      rate: jest.fn()
    };
    getters = {
      getRatingOptions: () => ratings[1]
    };
    store = new Vuex.Store({
      actions,
      state,
      getters
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

  it("triggers store action on rating click", () => {
    const wrapper = mount(GiveFeedback, {
      store,
      localVue,
      stubs: ["b-notification"]
    });
    const rating = wrapper.find(".rating span");
    rating.trigger("click"); // click first item
    expect(actions.rate.mock.calls[0][1]).toBe(1);
  });

  it("triggers confetti animation on rating if user level over 2", () => {
    const confettiMock = { start: jest.fn() };
    state.level = 3;
    const wrapper = mount(GiveFeedback, {
      store,
      localVue,
      stubs: ["b-notification"]
    });
    wrapper.vm.$confetti = confettiMock;
    const rating = wrapper.find(".rating span");
    rating.trigger("click"); // click first item
    expect(confettiMock.start.mock.calls.length).toBe(1);
  });

  it("shows already selected rating", () => {
    state.selectedRating = 2;
    const wrapper = mount(GiveFeedback, {
      store,
      localVue,
      stubs: ["b-notification"]
    });
    const selectedRating = wrapper.find(".rating span.active");
    expect(selectedRating.text()).toContain("🙂");
    expect(wrapper.find(".thank-you-notification").exists()).toBeTruthy();
  });
});
