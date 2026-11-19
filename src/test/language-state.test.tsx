import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { setLang, useLang, DEFAULT_LANG } from "@/lib/i18n";

afterEach(() => {
  cleanup();
  localStorage.clear();
  setLang("en");
});

describe("Site language selection", () => {
  it("defaults to French when the visitor has chosen no language", () => {
    localStorage.clear();
    const first = renderHook(useLang);
    expect(first.result.current).toBe("fr");
    expect(DEFAULT_LANG).toBe("fr");
    expect(document.documentElement.lang).toBe("fr");
  });

  it("persists French and updates all mounted language subscribers", () => {
    const first = renderHook(useLang);
    const second = renderHook(useLang);
    act(() => setLang("fr"));
    expect(first.result.current).toBe("fr");
    expect(second.result.current).toBe("fr");
    expect(localStorage.getItem("lang")).toBe("fr");
    expect(document.documentElement.lang).toBe("fr");
    first.unmount();
    expect(renderHook(useLang).result.current).toBe("fr");
  });

  it("switches back to English for every mounted subscriber", () => {
    const first = renderHook(useLang);
    const second = renderHook(useLang);
    act(() => setLang("fr"));
    act(() => setLang("en"));
    expect(first.result.current).toBe("en");
    expect(second.result.current).toBe("en");
    expect(localStorage.getItem("lang")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
  });
});