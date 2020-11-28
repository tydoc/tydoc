import { getFunctorComposition } from './Functor';
export function getFunctorWithIndexComposition(F, G) {
    return {
        map: getFunctorComposition(F, G).map,
        mapWithIndex: function (fga, f) { return F.mapWithIndex(fga, function (fi, ga) { return G.mapWithIndex(ga, function (gi, a) { return f([fi, gi], a); }); }); }
    };
}
