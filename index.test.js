import { describe, test, expect, vi } from "vitest";
import { notify } from "./notify.js";
import index from "./index.js";

vi.mock("./notify");

describe("action entrypoint", () => {
  test("invokes notify", async () => {
    expect(notify).toHaveBeenCalled();
  });
});
