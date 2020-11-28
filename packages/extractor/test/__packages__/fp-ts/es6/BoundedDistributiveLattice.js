import { getMinMaxDistributiveLattice } from './DistributiveLattice';
/**
 * @category instances
 * @since 2.0.0
 */
export function getMinMaxBoundedDistributiveLattice(O) {
    var L = getMinMaxDistributiveLattice(O);
    return function (min, max) { return ({
        join: L.join,
        meet: L.meet,
        zero: min,
        one: max
    }); };
}
