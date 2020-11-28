import * as E from './Either';
import { flow, pipe } from './function';
export function getEitherM(M) {
    var ap = function (fga) { return function (fgab) {
        return M.ap(M.map(fgab, function (h) { return function (ga) { return pipe(h, E.ap(ga)); }; }), fga);
    }; };
    var of = flow(E.right, M.of);
    return {
        map: function (fa, f) { return M.map(fa, E.map(f)); },
        ap: function (fab, fa) { return pipe(fab, ap(fa)); },
        of: of,
        chain: function (ma, f) { return M.chain(ma, function (e) { return (E.isLeft(e) ? M.of(E.left(e.left)) : f(e.right)); }); },
        alt: function (fa, that) { return M.chain(fa, function (e) { return (E.isLeft(e) ? that() : of(e.right)); }); },
        bimap: function (ma, f, g) { return M.map(ma, function (e) { return pipe(e, E.bimap(f, g)); }); },
        mapLeft: function (ma, f) { return M.map(ma, function (e) { return pipe(e, E.mapLeft(f)); }); },
        fold: function (ma, onLeft, onRight) { return M.chain(ma, E.fold(onLeft, onRight)); },
        getOrElse: function (ma, onLeft) { return M.chain(ma, E.fold(onLeft, M.of)); },
        orElse: function (ma, f) {
            return M.chain(ma, E.fold(f, function (a) { return of(a); }));
        },
        swap: function (ma) { return M.map(ma, E.swap); },
        rightM: function (ma) { return M.map(ma, E.right); },
        leftM: function (ml) { return M.map(ml, E.left); },
        left: function (e) { return M.of(E.left(e)); }
    };
}
