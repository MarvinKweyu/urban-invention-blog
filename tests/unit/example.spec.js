import { shallowMount } from "@vue/test-utils";
import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  beforeEach(() => {
    // start the variable with `mock` to keep it in scope
    const mockFakePostList = [
      { id: 1, title: "title1" },
      { id: 2, title: "title2" },
    ];

    // Mock any call to `axios.get` and to return `mockFakePostList` instead
    jest.mock("axios", () => ({
      get: jest.fn(() => mockFakePostList),
    }));
  });

  test("loads posts on button click", async () => {
    const wrapper = mount(HelloWorld);

    await wrapper.get("button").trigger("click");

    // Let's assert that we've called axios.get the right amount of times and
    // with the right parameters.
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/api/posts");

    // Wait until the DOM updates.
    // await flushPromises();
    wrapper.vm.$nextTick(() => {
      // Finally, we make sure we've rendered the content from the API.
      const posts = wrapper.findAll('[data-test="post"]');
      expect(wrapper.vm.posts.length).toBe(2);

      // expect(posts).toHaveLength(2);
      // expect(posts[0].text()).toContain("title1");
      // expect(posts[1].text()).toContain("title2");
    });
  });
});
