import { mount, flushPromises } from "@vue/test-utils";
import { useRouter } from "vue-router";
import Courses from "./index.vue";

const mockData = [
  {
    id: 286,
    name: "2020 Vue3 專業職人 | 入門篇 (預購中)",
    photo:
      "data:image/png;base64,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",
    money: 3200,
    teacher: {
      name: "Mike",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAYABgDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAACAkE/8QAGQEAAgMBAAAAAAAAAAAAAAAABAYBAwUC/9oADAMBAAIQAxAAAACdCM4sIGWXz2OBzWdl6pLYVvBNlG6bgTpAf//EACkQAAEEAgEDAwQDAQAAAAAAAAIBAwQFBgcSAAgRCRMiFBUhMhgjJDH/2gAIAQEAAT8AwzsjzOd2kXvd7VZjLejYzlH2+zp1Al9iIoEoujx/ZfIr8euwfL+5LAgv6vRllllVU1NTEyONprdUFQgy6iU8sdJVa+0ZPQeT4qnAfiC/9aJOtF7o0ls3IXcPYx6wxDNrI1lzNc5U6LZvPB+HXKyWP+aUnheZi3xI14+QBfKr6ddjkWWarv8AtUxRlqZKzG8N2NEfdQI/uNNq4Juqv4FsF+Sr1pXsw3XU1cpjO8ow6rnh9M7HkwGXFZs2+fuOo46gocZtHBTjzQlJAQlRE63VsTCc03ftzTG9qSyoJWgqKVd3NkMkeD1koijARPBIr6o6+AoIkhOcxUOvTK0vvfRHdhQ7B3pr6Zi2Mw25SfdbOU19NJfeD2GGAJsyQnHTNEFOst2NIoaC9dhNNSJ0OrcdYigho8IAYJ4Tl8V8iar+fKp16tnbdKn/AMotnZPPfpYUHHNaOxI36yZ86crgOOOtH5T+so/ISH5J1//EACURAAEDAwMDBQAAAAAAAAAAAAECAxEABEESITEFUWEicZGh8f/aAAgBAgEBPwB28Sq4DEQSNj5py8GkF0ocE6dbZ3BGDgwM/daFJSXGNweYz7jB85q+aLrocyB+1b9PcZdWUn0niTPyOBtTDF5bMtFBErMAdoncnA2mngACTSESqgXLS3Q+nmTIPBHbv5Nf/8QAJhEAAQMCBgEFAQAAAAAAAAAAAQIDEQAEBRIhMUFRYRMycYGx8P/aAAgBAwEBPwC2ZKUF06gb0La6tnChSVNkjMErEaHkcj4oPepCHDBG08ffI/Kw5QQkz/dVjWLIxFlqEwoe4AaT4O51pl22W65nMBKZmOx1zHVWpJlI8n9mjlyg1asMYjfqtl7djcb69TxX/9k=",
    },
    student: 645,
    star: 5,
  },
  {
    id: 419,
    name: "2020 Vue3 專業職人 | 進階篇 (預購中)",
    photo:
      "data:image/png;base64,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",
    money: 3800,
    teacher: {
      name: "Mike",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAYABgDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAACAkE/8QAGQEAAgMBAAAAAAAAAAAAAAAABAYBAwUC/9oADAMBAAIQAxAAAACdCM4sIGWXz2OBzWdl6pLYVvBNlG6bgTpAf//EACkQAAEEAgEDAwQDAQAAAAAAAAIBAwQFBgcSAAgRCRMiFBUhMhgjJDH/2gAIAQEAAT8AwzsjzOd2kXvd7VZjLejYzlH2+zp1Al9iIoEoujx/ZfIr8euwfL+5LAgv6vRllllVU1NTEyONprdUFQgy6iU8sdJVa+0ZPQeT4qnAfiC/9aJOtF7o0ls3IXcPYx6wxDNrI1lzNc5U6LZvPB+HXKyWP+aUnheZi3xI14+QBfKr6ddjkWWarv8AtUxRlqZKzG8N2NEfdQI/uNNq4Juqv4FsF+Sr1pXsw3XU1cpjO8ow6rnh9M7HkwGXFZs2+fuOo46gocZtHBTjzQlJAQlRE63VsTCc03ftzTG9qSyoJWgqKVd3NkMkeD1koijARPBIr6o6+AoIkhOcxUOvTK0vvfRHdhQ7B3pr6Zi2Mw25SfdbOU19NJfeD2GGAJsyQnHTNEFOst2NIoaC9dhNNSJ0OrcdYigho8IAYJ4Tl8V8iar+fKp16tnbdKn/AMotnZPPfpYUHHNaOxI36yZ86crgOOOtH5T+so/ISH5J1//EACURAAEDAwMDBQAAAAAAAAAAAAECAxEABEESITEFUWEicZGh8f/aAAgBAgEBPwB28Sq4DEQSNj5py8GkF0ocE6dbZ3BGDgwM/daFJSXGNweYz7jB85q+aLrocyB+1b9PcZdWUn0niTPyOBtTDF5bMtFBErMAdoncnA2mngACTSESqgXLS3Q+nmTIPBHbv5Nf/8QAJhEAAQMCBgEFAQAAAAAAAAAAAQIDEQAEBRIhMUFRYRMycYGx8P/aAAgBAwEBPwC2ZKUF06gb0La6tnChSVNkjMErEaHkcj4oPepCHDBG08ffI/Kw5QQkz/dVjWLIxFlqEwoe4AaT4O51pl22W65nMBKZmOx1zHVWpJlI8n9mjlyg1asMYjfqtl7djcb69TxX/9k=",
    },
    student: 645,
    star: 5,
  },
  {
    id: 418,
    name: "2020 Vue3 專業職人 | 加值篇 (預購中)",
    photo:
      "data:image/png;base64,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",
    money: 2600,
    teacher: {
      name: "Mike",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAYABgDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAACAkE/8QAGQEAAgMBAAAAAAAAAAAAAAAABAYBAwUC/9oADAMBAAIQAxAAAACdCM4sIGWXz2OBzWdl6pLYVvBNlG6bgTpAf//EACkQAAEEAgEDAwQDAQAAAAAAAAIBAwQFBgcSAAgRCRMiFBUhMhgjJDH/2gAIAQEAAT8AwzsjzOd2kXvd7VZjLejYzlH2+zp1Al9iIoEoujx/ZfIr8euwfL+5LAgv6vRllllVU1NTEyONprdUFQgy6iU8sdJVa+0ZPQeT4qnAfiC/9aJOtF7o0ls3IXcPYx6wxDNrI1lzNc5U6LZvPB+HXKyWP+aUnheZi3xI14+QBfKr6ddjkWWarv8AtUxRlqZKzG8N2NEfdQI/uNNq4Juqv4FsF+Sr1pXsw3XU1cpjO8ow6rnh9M7HkwGXFZs2+fuOo46gocZtHBTjzQlJAQlRE63VsTCc03ftzTG9qSyoJWgqKVd3NkMkeD1koijARPBIr6o6+AoIkhOcxUOvTK0vvfRHdhQ7B3pr6Zi2Mw25SfdbOU19NJfeD2GGAJsyQnHTNEFOst2NIoaC9dhNNSJ0OrcdYigho8IAYJ4Tl8V8iar+fKp16tnbdKn/AMotnZPPfpYUHHNaOxI36yZ86crgOOOtH5T+so/ISH5J1//EACURAAEDAwMDBQAAAAAAAAAAAAECAxEABEESITEFUWEicZGh8f/aAAgBAgEBPwB28Sq4DEQSNj5py8GkF0ocE6dbZ3BGDgwM/daFJSXGNweYz7jB85q+aLrocyB+1b9PcZdWUn0niTPyOBtTDF5bMtFBErMAdoncnA2mngACTSESqgXLS3Q+nmTIPBHbv5Nf/8QAJhEAAQMCBgEFAQAAAAAAAAAAAQIDEQAEBRIhMUFRYRMycYGx8P/aAAgBAwEBPwC2ZKUF06gb0La6tnChSVNkjMErEaHkcj4oPepCHDBG08ffI/Kw5QQkz/dVjWLIxFlqEwoe4AaT4O51pl22W65nMBKZmOx1zHVWpJlI8n9mjlyg1asMYjfqtl7djcb69TxX/9k=",
    },
    student: 645,
    star: 5,
  },
];

jest.mock("vue-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    resolve: jest.fn(),
  })),
}));

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: mockData })),
}));

describe("Courses", () => {
  it("courses onMounted fetch api data remder list", async () => {
    const wrapper = mount(Courses);
    await flushPromises();

    // 檢查 DOM 是否有成功 render 出來˙
    expect(wrapper.findAll(".card").length).toBe(3);
  });

  it("click course push page", async () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
    }));
    const wrapper = mount(Courses);
    await flushPromises();

    await wrapper.findAll(".card")[0].trigger("click");
    // toHaveBeenCalledWith => 判断 (push) 這個方法時候，被調用時候的參數
    expect(push).toHaveBeenCalledWith("/courses/286");

    await wrapper.findAll(".card")[1].trigger("click");
    // toHaveBeenCalledWith => 判断 (push) 這個方法時候，被調用時候的參數
    expect(push).toHaveBeenCalledWith("/courses/419");
  });
});
