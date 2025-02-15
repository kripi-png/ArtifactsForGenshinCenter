import { describe, expect, test } from "vitest";
import { migrateTo_2_0_0 } from "./migration";
import type { UserArtifactData } from "../types";

describe("migrates to 2.0", () => {
  test("converts an empty object", () => {
    const emptyTest = {};
    const emptyResult: UserArtifactData = {
      __DISABLED: false,
      __VERSION: 1,
      characters: {},
    };
    expect(migrateTo_2_0_0(emptyTest)).toStrictEqual(emptyResult);
  });

  test("keeps the value of __DISABLED when provided", () => {
    expect(migrateTo_2_0_0({ __DISABLED: true }).__DISABLED).toBe(true);
  });

  test("hyphenates names with spaces", () => {
    const hyphenateTest = {
      "hu tao": {},
      "TEST CHAR": {},
    };
    expect(
      Object.keys(migrateTo_2_0_0(hyphenateTest).characters),
    ).toStrictEqual(["hu-tao", "test-char"]);
  });

  test("chages the property names main, stat, and set", () => {
    const changePropertyNamesTest = {
      "hu tao": {
        flower: { check: true, main: "", set: "Obsidian Codex", sub: "" },
      },
    };
    expect(
      migrateTo_2_0_0(changePropertyNamesTest).characters["hu-tao"]?.artifacts,
    ).toStrictEqual({
      flower: {
        check: true,
        artifactSet: "Obsidian Codex",
        mainStat: "",
        subStats: "",
      },
    });
  });
});
