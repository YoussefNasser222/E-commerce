"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.StatusOrder = exports.TokenType = exports.Gender = exports.Agent = exports.Role = void 0;
var Role;
(function (Role) {
    Role["user"] = "user";
    Role["admin"] = "admin";
})(Role || (exports.Role = Role = {}));
var Agent;
(function (Agent) {
    Agent["local"] = "local";
    Agent["google"] = "google";
})(Agent || (exports.Agent = Agent = {}));
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
})(Gender || (exports.Gender = Gender = {}));
var TokenType;
(function (TokenType) {
    TokenType["access"] = "access";
    TokenType["refresh"] = "refresh";
})(TokenType || (exports.TokenType = TokenType = {}));
var StatusOrder;
(function (StatusOrder) {
    StatusOrder["confirmed"] = "confirmed";
    StatusOrder["pending"] = "pending";
    StatusOrder["cancelled"] = "cancelled";
})(StatusOrder || (exports.StatusOrder = StatusOrder = {}));
var Payment;
(function (Payment) {
    Payment["cash"] = "cash";
    Payment["card"] = "card";
})(Payment || (exports.Payment = Payment = {}));
