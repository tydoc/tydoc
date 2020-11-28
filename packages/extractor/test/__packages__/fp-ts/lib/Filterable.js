"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterableComposition = void 0;
/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 *
 * @since 2.0.0
 */
var Compactable_1 = require("./Compactable");
var Option_1 = require("./Option");
function getFilterableComposition(F, G) {
    var CC = Compactable_1.getCompactableComposition(F, G);
    var FC = {
        map: CC.map,
        compact: CC.compact,
        separate: CC.separate,
        partitionMap: function (fga, f) {
            var left = FC.filterMap(fga, function (a) { return Option_1.getLeft(f(a)); });
            var right = FC.filterMap(fga, function (a) { return Option_1.getRight(f(a)); });
            return { left: left, right: right };
        },
        partition: function (fga, p) {
            var left = FC.filter(fga, function (a) { return !p(a); });
            var right = FC.filter(fga, p);
            return { left: left, right: right };
        },
        filterMap: function (fga, f) { return F.map(fga, function (ga) { return G.filterMap(ga, f); }); },
        filter: function (fga, f) { return F.map(fga, function (ga) { return G.filter(ga, f); }); }
    };
    return FC;
}
exports.getFilterableComposition = getFilterableComposition;
