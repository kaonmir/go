"use strict";
exports.__esModule = true;
exports.move = exports.initBoard = void 0;
var STONE_1 = require("./STONE");
var error_json_1 = require("./error.json");
var Point_1 = require("./Point");
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
    var board = Array(19 * 19);
    var moveLogs = parseGo(str);
    var groups = Array(19 * 19).fill(0);
    var counts = (_a = {},
        _a[STONE_1["default"].BLACK] = 0,
        _a[STONE_1["default"].WHITE] = 0,
        _a);
    moveLogs.forEach(function (cur, idx) {
        var turn = idx % 2 === 0 ? STONE_1["default"].BLACK : STONE_1["default"].WHITE;
        var capturedStones = exports.move(board, groups, cur, turn);
        counts[turn] += capturedStones;
    });
    return { board: board, groups: groups, counts: counts };
};
// 같은 곳 여러 번 왔다갔다 하는 건 구현 X
// 얼마나 많이 잡았는가를 return
exports.move = function (board, groups, cur, turn) {
    if (!STONE_1.isEmpty(board[cur]))
        throw Error(error_json_1["default"].LOG_ERROR);
    // 0. 돌을 놓는다.
    board[cur] = turn;
    // TODO: 상대방의 돌로 둘러싸인 돌은 죽은 돌이 된다.
    var counts = cankill(board, groups, cur);
    // TODO: 사방이 다른 색 돌로 둘러싸인 곳에는 착수할 수 없다. 단, 둘러싼 다른 색 돌 중 끊어진 부분이 있어서 단수가 되어있을 때는 착수가 가능하다. 물론 단수가 된 그 다른 색 돌은 잡힌다.
    if (canbekilled(board, groups, cur))
        throw Error(error_json_1["default"].CAN_BE_KILLED);
    else
        return counts;
};
var canbekilled = function (board, groups, cur) {
    return groups.every(function (group, dst) {
        if (group !== groups[cur])
            return true;
        else
            return Point_1.toFourWays(dst).every(function (p) { return board[p] !== undefined; });
    });
};
var cankill = function (board, groups, cur) {
    // 1. 놓은 돌을 그룹에 넣는다. BFS
    // 원래는 BFS 인데 전체 탐색도 괜찮을 듯하다.
    var dsts = Point_1.toFourWays(cur);
    /// 내가 놓은 돌 주변의 그룹을 가져온다. (내 편만!)
    var gs = dsts
        .filter(function (dst) { return board[dst] === board[cur]; })
        .map(function (dst) { return groups[dst]; })
        .filter(function (dst, idx, _) { return _.indexOf(dst) === idx; });
    var maxGroup = Math.max.apply(Math, groups);
    if (gs.length === 0)
        groups[cur] = maxGroup + 1;
    else if (gs.length === 1)
        groups[cur] = gs[0];
    else
        gs.slice(1).forEach(function (g) {
            return groups.forEach(function (group, idx) {
                if (group === g)
                    groups[idx] = gs[0];
            });
        });
    // 2. 다른 그룹을 완벽히 감싸는지 확인함.
    var enemyGroups = dsts
        .filter(function (dst) { return STONE_1.isEnemy(board[cur], board[dst]); })
        .map(function (dst) { return groups[dst]; });
    var enemyCoveredGroups = enemyGroups.filter(function (enemyGroup) {
        return groups.every(function (group, dst) {
            if (group !== enemyGroup)
                return true;
            else
                return Point_1.toFourWays(dst).every(function (p) { return board[p] !== undefined; });
        });
    });
    // 3. 감싸면 count를 늘려주고 돌을 싹 없앤다.
    var count = 0;
    enemyCoveredGroups.forEach(function (enemyCoveredGroup) {
        groups.forEach(function (group, dst) {
            if (group === enemyCoveredGroup) {
                count += 1;
                delete board[dst];
                groups[dst] = 0;
            }
        });
    });
    return count;
};
