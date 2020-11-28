"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEitherM = void 0;
var E = __importStar(require("./Either"));
var function_1 = require("./function");
function getEitherM(M) {
    var ap = function (fga) { return function (fgab) {
        return M.ap(M.map(fgab, function (h) { return function (ga) { return function_1.pipe(h, E.ap(ga)); }; }), fga);
    }; };
    var of = function_1.flow(E.right, M.of);
    return {
        map: function (fa, f) { return M.map(fa, E.map(f)); },
        ap: function (fab, fa) { return function_1.pipe(fab, ap(fa)); },
        of: of,
        chain: function (ma, f) { return M.chain(ma, function (e) { return (E.isLeft(e) ? M.of(E.left(e.left)) : f(e.right)); }); },
        alt: function (fa, that) { return M.chain(fa, function (e) { return (E.isLeft(e) ? that() : of(e.right)); }); },
        bimap: function (ma, f, g) { return M.map(ma, function (e) { return function_1.pipe(e, E.bimap(f, g)); }); },
        mapLeft: function (ma, f) { return M.map(ma, function (e) { return function_1.pipe(e, E.mapLeft(f)); }); },
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
exports.getEitherM = getEitherM;
