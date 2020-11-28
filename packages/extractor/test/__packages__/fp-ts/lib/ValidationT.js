"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationM = void 0;
/**
 * @since 2.0.0
 */
var Applicative_1 = require("./Applicative");
var Either_1 = require("./Either");
function getValidationM(S, M) {
    var A = Applicative_1.getApplicativeComposition(M, Either_1.getValidation(S));
    return {
        map: A.map,
        ap: A.ap,
        of: A.of,
        chain: /* istanbul ignore next */ function (ma, f) { return M.chain(ma, function (e) { return (Either_1.isLeft(e) ? M.of(Either_1.left(e.left)) : f(e.right)); }); },
        alt: function (me, that) {
            return M.chain(me, function (e1) {
                return Either_1.isRight(e1) ? M.of(e1) : M.map(that(), function (e2) { return (Either_1.isLeft(e2) ? Either_1.left(S.concat(e1.left, e2.left)) : e2); });
            });
        }
    };
}
exports.getValidationM = getValidationM;
