"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["LOGIN"] = 0] = "LOGIN";
    MessageType[MessageType["LOGOUT"] = 1] = "LOGOUT";
    MessageType[MessageType["CALL"] = 2] = "CALL";
    MessageType[MessageType["OFFER"] = 3] = "OFFER";
    MessageType[MessageType["ANSWER"] = 4] = "ANSWER";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
__exportStar(require("./ws-client"), exports);
//# sourceMappingURL=index.js.map