"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctorWithIndexComposition = void 0;
var Functor_1 = require("./Functor");
function getFunctorWithIndexComposition(F, G) {
    return {
        map: Functor_1.getFunctorComposition(F, G).map,
        mapWithIndex: function (fga, f) { return F.mapWithIndex(fga, function (fi, ga) { return G.mapWithIndex(ga, function (gi, a) { return f([fi, gi], a); }); }); }
    };
}
exports.getFunctorWithIndexComposition = getFunctorWithIndexComposition;
