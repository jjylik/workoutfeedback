import { shallowMount } from "@vue/test-utils";
import Level from "@/components/Level.vue";

describe("Level", () => {
  it("renders", () => {
    const wrapper = shallowMount(Level, {
      stubs: ["b-tag"]
    });
    expect(wrapper.html()).toContain('<div class="container">');
  });

  it("has tag based on user level", () => {
    const wrapper = shallowMount(Level, {
      stubs: ["b-tag"],
      propsData: {
        level: 2
      }
    });
    expect(wrapper.find("b-tag-stub").attributes().size).toBe("is-medium");
    expect(wrapper.find("b-tag-stub").attributes().type).toBe("is-dark");
  });
});
