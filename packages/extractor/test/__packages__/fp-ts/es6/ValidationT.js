/**
 * @since 2.0.0
 */
import { getApplicativeComposition } from './Applicative';
import { getValidation, isLeft, isRight, left } from './Either';
export function getValidationM(S, M) {
    var A = getApplicativeComposition(M, getValidation(S));
    return {
        map: A.map,
        ap: A.ap,
        of: A.of,
        chain: /* istanbul ignore next */ function (ma, f) { return M.chain(ma, function (e) { return (isLeft(e) ? M.of(left(e.left)) : f(e.right)); }); },
        alt: function (me, that) {
            return M.chain(me, function (e1) {
                return isRight(e1) ? M.of(e1) : M.map(that(), function (e2) { return (isLeft(e2) ? left(S.concat(e1.left, e2.left)) : e2); });
            });
        }
    };
}
