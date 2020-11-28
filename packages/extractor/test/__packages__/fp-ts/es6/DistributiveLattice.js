import { max, min } from './Ord';
/**
 * @category instances
 * @since 2.0.0
 */
export function getMinMaxDistributiveLattice(O) {
    return {
        meet: min(O),
        join: max(O)
    };
}
