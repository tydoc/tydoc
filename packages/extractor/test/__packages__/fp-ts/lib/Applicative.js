"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicativeComposition = void 0;
var Functor_1 = require("./Functor");
function getApplicativeComposition(F, G) {
    return {
        map: Functor_1.getFunctorComposition(F, G).map,
        of: function (a) { return F.of(G.of(a)); },
        ap: function (fgab, fga) {
            return F.ap(F.map(fgab, function (h) { return function (ga) { return G.ap(h, ga); }; }), fga);
        }
    };
}
exports.getApplicativeComposition = getApplicativeComposition;
