"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const abstraction_repository_1 = require("../../abstraction.repository");
const order_model_1 = require("./order.model");
class OrderRepository extends abstraction_repository_1.AbstractRepository {
    constructor() {
        super(order_model_1.Order);
    }
}
exports.OrderRepository = OrderRepository;
