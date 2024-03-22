import { describe, test, expect, beforeEach, vi } from "vitest";
import { notify } from "./notify";
import core from "@actions/core";

vi.mock("@actions/core", () => ({
  default: {
    getInput: vi.fn(),
    setFailed: vi.fn(),
    setOutput: vi.fn(),
  },
}));

describe("notify", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn().mockResolvedValue({ json: vi.fn() });
  });
  test("makes a post request with the given input", async () => {
    core.getInput
      .mockImplementationOnce(() => "example@example.com")
      .mockImplementationOnce(() => "the subject")
      .mockImplementationOnce(() => "the body");
    await notify();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.cinotify.cc/api/notify",
      expect.objectContaining({
        body: expect.stringMatching(
          /to(.*)example@example.com(.*)subject(.*)the subject(.*)body(.*)the body/
        ),
      })
    );
  });
  test("errors on status >= 300", async () => {
    const response = JSON.stringify({
      errors: [{ message: "Does not contain a valid address." }],
    });
    global.fetch.mockResolvedValueOnce(
      new Response(response, {
        status: 400,
      })
    );
    await notify();
    expect(core.setFailed).toHaveBeenCalledWith(response);
  });
});
