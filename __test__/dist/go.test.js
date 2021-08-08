"use strict";
exports.__esModule = true;
var go_1 = require("../src/go");
var STONE_1 = require("../src/STONE");
var error_json_1 = require("../src/error.json");
test("Sample", function () {
    expect(1).toEqual(1);
});
describe("Put the stones down on the board", function () {
    test("call Go function", function () {
        var initFormat = "60 61 62 63 64 65 66 67";
        var _a = go_1.initBoard(initFormat), board = _a.board, counts = _a.counts, groups = _a.groups;
        expect(counts).toEqual({ 0: 0, 1: 0 });
    });
    test("put down at the corner", function () {
        var initFormat = "0 1 2 3 4";
        var board = go_1.initBoard(initFormat).board;
        expect(board[0]).toBe(STONE_1["default"].BLACK);
        expect(board[1]).toBe(STONE_1["default"].WHITE);
        expect(board[2]).toBe(STONE_1["default"].BLACK);
    });
});
describe("catch if black can - a stone", function () {
    test("catch aroung 4 ways", function () {
        var initFormat = "22 37 40 41 42 56 60";
        var _a = go_1.initBoard(initFormat), board = _a.board, counts = _a.counts;
        expect(board[41]).toBe(undefined);
        expect(counts).toEqual({ 0: 1, 1: 0 });
    });
    test("catch aroung 3 ways", function () {
        var initFormat = "38 57 58 11 76";
        var _a = go_1.initBoard(initFormat), board = _a.board, counts = _a.counts;
        expect(board[57]).toBe(undefined);
        expect(counts).toEqual({ 0: 1, 1: 0 });
    });
    test("catch aroung 2 ways", function () {
        var initFormat = "1 0 19";
        var _a = go_1.initBoard(initFormat), board = _a.board, counts = _a.counts;
        expect(board[0]).toBe(undefined);
        expect(counts).toEqual({ 0: 1, 1: 0 });
    });
});
describe("catch if white can - stones", function () {
    test("along with edge", function () {
        var initFormat = "0 19 1 20 2 21 22 3";
        var _a = go_1.initBoard(initFormat), board = _a.board, counts = _a.counts;
        expect(board[0]).toBe(undefined);
        expect(board[2]).toBe(undefined);
        expect(counts).toEqual({ 0: 0, 1: 3 });
    });
    test("make a box and let them alive", function () {
        var initFormat = "1 0 20 19 2 39 21 40 18 22 17 4 16 3 ";
        var _a = go_1.initBoard(initFormat), board = _a.board, counts = _a.counts;
        expect(board[1]).toBe(undefined);
        expect(board[21]).toBe(undefined);
        expect(counts).toEqual({ 0: 0, 1: 4 });
    });
    test("double kill", function () {
        var initFormat = "1 0 3 20 18 22 17 4 16 2";
        var _a = go_1.initBoard(initFormat), board = _a.board, counts = _a.counts;
        expect(board[1]).toBe(undefined);
        expect(board[3]).toBe(undefined);
        expect(counts).toEqual({ 0: 0, 1: 2 });
    });
});
describe("never can be killed", function () {
    test("never die at #2", function () {
        var initFormat = "0 18 20 27 2 1";
        expect(function () { return go_1.initBoard(initFormat); }).toThrow(error_json_1["default"].CAN_BE_KILLED);
    });
});
/*
0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18
19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37
38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56
57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75
76 77 78 79 80 81 82 83 84 85 86 87 88 89 90
*/
