import { initBoard } from "../src/go";
import STONE from "../src/STONE";
import ERROR from "../src/error.json";

test("Sample", () => {
  expect(1).toEqual(1);
});

describe("Pretty nothing's on here", () => {
  test("Nothing move", () => {
    const initFormat = "";
    const { board } = initBoard(initFormat);
    expect(board[0]).toEqual(STONE.EMPTY);
  });
  test("never die at #2", () => {
    const initFormat = "0 18 20 27 2 1";
    expect(() => initBoard(initFormat)).toThrow(ERROR.CAN_BE_KILLED);
  });
});

describe("Put the stones down on the board", () => {
  test("call Go function", () => {
    const initFormat = "60 61 62 63 64 65 66 67";
    const { board, counts } = initBoard(initFormat);
    expect(counts).toEqual({ 0: 0, 1: 0 });
  });

  test("put down at the corner", () => {
    const initFormat = "0 1 2 3 4";
    const { board } = initBoard(initFormat);
    expect(board[0]).toBe(STONE.BLACK);
    expect(board[1]).toBe(STONE.WHITE);
    expect(board[2]).toBe(STONE.BLACK);
  });
});

describe("catch if black can - a stone", () => {
  test("catch aroung 4 ways", () => {
    const initFormat = "22 37 40 41 42 56 60";
    const { board, counts } = initBoard(initFormat);
    expect(board[41]).toBe(STONE.EMPTY);
    expect(counts).toEqual({ 0: 1, 1: 0 });
  });
  test("catch aroung 3 ways", () => {
    const initFormat = "38 57 58 11 76";
    const { board, counts } = initBoard(initFormat);
    expect(board[57]).toBe(STONE.EMPTY);
    expect(counts).toEqual({ 0: 1, 1: 0 });
  });
  test("catch aroung 2 ways", () => {
    const initFormat = "1 0 19";
    const { board, counts } = initBoard(initFormat);
    expect(board[0]).toBe(STONE.EMPTY);
    expect(counts).toEqual({ 0: 1, 1: 0 });
  });
});

describe("catch if white can - stones", () => {
  test("along with edge", () => {
    const initFormat = "0 19 1 20 2 21 22 3";
    const { board, counts } = initBoard(initFormat);
    expect(board[0]).toBe(STONE.EMPTY);
    expect(board[2]).toBe(STONE.EMPTY);
    expect(counts).toEqual({ 0: 0, 1: 3 });
  });
  test("make a box and let them alive", () => {
    const initFormat = "1 0 20 19 2 39 21 40 18 22 17 4 16 3 ";
    const { board, counts } = initBoard(initFormat);
    expect(board[1]).toBe(STONE.EMPTY);
    expect(board[21]).toBe(STONE.EMPTY);
    expect(counts).toEqual({ 0: 0, 1: 4 });
  });
  test("double kill", () => {
    const initFormat = "1 0 3 20 18 22 17 4 16 2";
    const { board, counts } = initBoard(initFormat);
    expect(board[1]).toBe(STONE.EMPTY);
    expect(board[3]).toBe(STONE.EMPTY);
    expect(counts).toEqual({ 0: 0, 1: 2 });
  });
});

describe("Catch at the right side", () => {
  test("Right side one catch up", () => {
    const initFormat = "18 17 36 37";
    const { board, counts } = initBoard(initFormat);
    expect(board[18]).toBe(STONE.EMPTY);
    expect(board[17]).toBe(STONE.WHITE);
    expect(counts).toEqual({ 0: 0, 1: 1 });
  });
});

// TODO: MOVE

/*
0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18
19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37
38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56
57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75
76 77 78 79 80 81 82 83 84 85 86 87 88 89 90
*/
