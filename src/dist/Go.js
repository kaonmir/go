"use strict";
exports.__esModule = true;
exports.move = exports.initBoard = void 0;
var STONE_1 = require("./STONE");
var error_json_1 = require("./error.json");
var Point_1 = require("./Point");
var bfs_1 = require("./bfs");
// Group 을 구현하는 것도 애매하다.
var parseGo = function (str) {
    return str
        .trim()
        .split(" ")
        .map(function (k) { return parseInt(k); });
};
// counts: 검은색이 1점 더 먹었다.
exports.initBoard = function (str) {
    var _a;
    var board = Array(19 * 19).fill(STONE_1["default"].EMPTY);
    var moveLogs = parseGo(str);
    var counts = (_a = {},
        _a[STONE_1["default"].BLACK] = 0,
        _a[STONE_1["default"].WHITE] = 0,
        _a);
    moveLogs.forEach(function (cur, idx) {
        var turn = idx % 2 === 0 ? STONE_1["default"].BLACK : STONE_1["default"].WHITE;
        var capturedStones = exports.move(board, cur, turn);
        counts[turn] += capturedStones;
    });
    var turn = moveLogs.length % 2 === 0 ? STONE_1["default"].BLACK : STONE_1["default"].WHITE;
    return { board: board, counts: counts, turn: turn };
};
// 같은 곳 여러 번 왔다갔다 하는 건 구현 X
// 얼마나 많이 잡았는가를 return
exports.move = function (board, cur, turn) {
    if (!STONE_1.isEmpty(board[cur]))
        throw Error(error_json_1["default"].LOG_ERROR);
    // 0. 돌을 놓는다.
    board[cur] = turn;
    // TODO: 상대방의 돌로 둘러싸인 돌은 죽은 돌이 된다.
    var counts = cankill(board, cur);
    // TODO: 사방이 다른 색 돌로 둘러싸인 곳에는 착수할 수 없다. 단, 둘러싼 다른 색 돌 중 끊어진 부분이 있어서 단수가 되어있을 때는 착수가 가능하다. 물론 단수가 된 그 다른 색 돌은 잡힌다.
    if (canbekilled(board, cur))
        throw Error(error_json_1["default"].CAN_BE_KILLED);
    else
        return counts;
};
var canbekilled = function (board, cur) {
    var alliances = bfs_1["default"](board, cur);
    return alliances.every(function (alliance) {
        return Point_1.toFourWays(alliance).every(function (p) { return !STONE_1.isEmpty(board[p]); });
    });
};
var cankill = function (board, cur) {
    return Point_1.toFourWays(cur)
        .filter(function (dst) { return STONE_1.isEnemy(board[cur], board[dst]); })
        .filter(function (dst) { return canbekilled(board, dst); })
        .map(function (dst) {
        if (STONE_1.isEmpty(board[dst]))
            return 0;
        var alliances = bfs_1["default"](board, dst);
        alliances.forEach(function (p) { return (board[p] = STONE_1["default"].EMPTY); });
        return alliances.length;
    })
        .reduce(function (prev, v) { return prev + v; }, 0);
};
