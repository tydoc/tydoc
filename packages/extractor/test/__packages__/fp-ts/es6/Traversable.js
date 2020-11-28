import { getFoldableComposition } from './Foldable';
import { getFunctorComposition } from './Functor';
export function getTraversableComposition(F, G) {
    var FC = getFoldableComposition(F, G);
    return {
        map: getFunctorComposition(F, G).map,
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
