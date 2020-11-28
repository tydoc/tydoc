"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctorComposition = void 0;
function getFunctorComposition(F, G) {
    return {
        map: function (fa, f) { return F.map(fa, function (ga) { return G.map(ga, f); }); }
    };
}
exports.getFunctorComposition = getFunctorComposition;
