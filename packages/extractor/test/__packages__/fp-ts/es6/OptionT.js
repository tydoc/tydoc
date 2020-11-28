/**
 * @since 2.0.0
 */
import { getApplicativeComposition } from './Applicative';
import { fold, none, Applicative, some } from './Option';
export function getOptionM(M) {
    var A = getApplicativeComposition(M, Applicative);
    var fnone = M.of(none);
    return {
        map: A.map,
        ap: A.ap,
        of: A.of,
        chain: function (ma, f) {
            return M.chain(ma, fold(function () { return fnone; }, f));
        },
        alt: function (fa, that) {
            return M.chain(fa, fold(that, function (a) { return M.of(some(a)); }));
        },
        fold: function (ma, onNone, onSome) { return M.chain(ma, fold(onNone, onSome)); },
        getOrElse: function (ma, onNone) { return M.chain(ma, fold(onNone, M.of)); },
        fromM: function (ma) { return M.map(ma, some); },
        none: function () { return fnone; }
    };
}
