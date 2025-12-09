import { describe, expect, test } from "bun:test";
import { parsePageParam } from "@/utils/parsePageParam";

describe("parsePageParam", () => {
  test("should return valid positive integers as-is", () => {
    expect(parsePageParam("1")).toBe(1);
    expect(parsePageParam("5")).toBe(5);
    expect(parsePageParam("10")).toBe(10);
    expect(parsePageParam("100")).toBe(100);
  });

  test("should floor decimal numbers", () => {
    expect(parsePageParam("5.7")).toBe(5);
    expect(parsePageParam("10.9")).toBe(10);
    expect(parsePageParam("2.1")).toBe(2);
    expect(parsePageParam("99.99")).toBe(99);
  });

  test("should return 1 for zero", () => {
    expect(parsePageParam("0")).toBe(1);
  });

  test("should return 1 for negative numbers", () => {
    expect(parsePageParam("-1")).toBe(1);
    expect(parsePageParam("-5")).toBe(1);
    expect(parsePageParam("-10.5")).toBe(1);
  });

  test("should return 1 for null", () => {
    expect(parsePageParam(null)).toBe(1);
  });

  test("should return 1 for undefined", () => {
    expect(parsePageParam(undefined)).toBe(1);
  });

  test("should return 1 for invalid strings", () => {
    expect(parsePageParam("abc")).toBe(1);
    expect(parsePageParam("not-a-number")).toBe(1);
    expect(parsePageParam("12abc")).toBe(1);
    expect(parsePageParam("abc123")).toBe(1);
  });

  test("should return 1 for empty string", () => {
    expect(parsePageParam("")).toBe(1);
  });

  test("should return 1 for NaN", () => {
    expect(parsePageParam(String(NaN))).toBe(1);
  });

  test("should handle whitespace strings", () => {
    expect(parsePageParam("   ")).toBe(1);
    expect(parsePageParam(" 5 ")).toBe(5);
    expect(parsePageParam("1 ")).toBe(1);
    expect(parsePageParam(" 1")).toBe(1);
  });

  test("should handle very large numbers", () => {
    expect(parsePageParam("999999")).toBe(999999);
    expect(parsePageParam("1e10")).toBe(10000000000);
  });

  test("should handle string representations of numbers", () => {
    expect(parsePageParam("42")).toBe(42);
    expect(parsePageParam("007")).toBe(7);
  });
});
