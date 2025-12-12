"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const abstraction_repository_1 = require("../../abstraction.repository");
const user_model_1 = require("./user.model");
class UserRepository extends abstraction_repository_1.AbstractRepository {
    constructor() {
        super(user_model_1.User);
    }
}
exports.UserRepository = UserRepository;
