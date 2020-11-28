"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTupleShow = exports.getStructShow = exports.showBoolean = exports.showNumber = exports.showString = void 0;
/**
 * @category instances
 * @since 2.0.0
 */
exports.showString = {
    show: function (a) { return JSON.stringify(a); }
};
/**
 * @category instances
 * @since 2.0.0
 */
exports.showNumber = {
    show: function (a) { return JSON.stringify(a); }
};
/**
 * @category instances
 * @since 2.0.0
 */
exports.showBoolean = {
    show: function (a) { return JSON.stringify(a); }
};
/**
 * @category instances
 * @since 2.0.0
 */
function getStructShow(shows) {
    return {
        show: function (s) {
            return "{ " + Object.keys(shows)
                .map(function (k) { return k + ": " + shows[k].show(s[k]); })
                .join(', ') + " }";
        }
    };
}
exports.getStructShow = getStructShow;
/**
 * @category instances
 * @since 2.0.0
 */
function getTupleShow() {
    var shows = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        shows[_i] = arguments[_i];
    }
    return {
        show: function (t) { return "[" + t.map(function (a, i) { return shows[i].show(a); }).join(', ') + "]"; }
    };
}
exports.getTupleShow = getTupleShow;
