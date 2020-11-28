import { getFunctorComposition } from './Functor';
import { getLeft, getRight } from './Option';
export function getCompactableComposition(F, G) {
    var FC = getFunctorComposition(F, G);
    var CC = {
        map: FC.map,
        compact: function (fga) { return F.map(fga, G.compact); },
        separate: function (fge) {
            var left = CC.compact(FC.map(fge, getLeft));
            var right = CC.compact(FC.map(fge, getRight));
            return { left: left, right: right };
        }
    };
    return CC;
}
