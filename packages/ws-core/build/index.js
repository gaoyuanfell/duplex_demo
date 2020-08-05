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
    MessageType["LOGIN"] = "LOGIN";
    MessageType["LOGOUT"] = "LOGOUT";
    MessageType["CALL"] = "CALL";
    MessageType["OFFER"] = "OFFER";
    MessageType["ANSWER"] = "ANSWER";
    MessageType["CREATE_ROOM"] = "CREATE_ROOM";
    MessageType["CREATE_ROOM_STATE"] = "CREATE_ROOM_STATE";
    MessageType["JOIN_ROOM"] = "JOIN_ROOM";
    MessageType["OUT_ROOM"] = "OUT_ROOM";
    MessageType["PING"] = "PING";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
__exportStar(require("./ws-client"), exports);
__exportStar(require("./duplex"), exports);
//# sourceMappingURL=index.js.map