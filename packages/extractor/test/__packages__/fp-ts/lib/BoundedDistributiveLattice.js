"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinMaxBoundedDistributiveLattice = void 0;
var DistributiveLattice_1 = require("./DistributiveLattice");
/**
 * @category instances
 * @since 2.0.0
 */
function getMinMaxBoundedDistributiveLattice(O) {
    var L = DistributiveLattice_1.getMinMaxDistributiveLattice(O);
    return function (min, max) { return ({
        join: L.join,
        meet: L.meet,
        zero: min,
        one: max
    }); };
}
exports.getMinMaxBoundedDistributiveLattice = getMinMaxBoundedDistributiveLattice;
