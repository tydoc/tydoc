import { getFunctorComposition } from './Functor';
export function getApplicativeComposition(F, G) {
    return {
        map: getFunctorComposition(F, G).map,
        of: function (a) { return F.of(G.of(a)); },
        ap: function (fgab, fga) {
            return F.ap(F.map(fgab, function (h) { return function (ga) { return G.ap(h, ga); }; }), fga);
        }
    };
}
