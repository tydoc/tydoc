"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTraversableComposition = void 0;
var Foldable_1 = require("./Foldable");
var Functor_1 = require("./Functor");
function getTraversableComposition(F, G) {
    var FC = Foldable_1.getFoldableComposition(F, G);
    return {
        map: Functor_1.getFunctorComposition(F, G).map,
        reduce: FC.reduce,
        foldMap: FC.foldMap,
        reduceRight: FC.reduceRight,
        traverse: function (H) {
            var traverseF = F.traverse(H);
            var traverseG = G.traverse(H);
            return function (fga, f) { return traverseF(fga, function (ga) { return traverseG(ga, f); }); };
        },
        sequence: function (H) {
            var sequenceF = F.sequence(H);
            var sequenceG = G.sequence(H);
            return function (fgha) { return sequenceF(F.map(fgha, sequenceG)); };
        }
    };
}
exports.getTraversableComposition = getTraversableComposition;
