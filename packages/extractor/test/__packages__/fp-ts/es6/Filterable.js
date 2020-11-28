/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 *
 * @since 2.0.0
 */
import { getCompactableComposition } from './Compactable';
import { getLeft, getRight } from './Option';
export function getFilterableComposition(F, G) {
    var CC = getCompactableComposition(F, G);
    var FC = {
        map: CC.map,
        compact: CC.compact,
        separate: CC.separate,
        partitionMap: function (fga, f) {
            var left = FC.filterMap(fga, function (a) { return getLeft(f(a)); });
            var right = FC.filterMap(fga, function (a) { return getRight(f(a)); });
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
