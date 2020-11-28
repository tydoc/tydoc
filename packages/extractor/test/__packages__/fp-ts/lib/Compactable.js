"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompactableComposition = void 0;
var Functor_1 = require("./Functor");
var Option_1 = require("./Option");
function getCompactableComposition(F, G) {
    var FC = Functor_1.getFunctorComposition(F, G);
    var CC = {
        map: FC.map,
        compact: function (fga) { return F.map(fga, G.compact); },
        separate: function (fge) {
            var left = CC.compact(FC.map(fge, Option_1.getLeft));
            var right = CC.compact(FC.map(fge, Option_1.getRight));
            return { left: left, right: right };
        }
    };
    return CC;
}
exports.getCompactableComposition = getCompactableComposition;
