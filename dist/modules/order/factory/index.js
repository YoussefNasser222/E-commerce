"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFactory = void 0;
const utils_1 = require("../../../utils");
const entity_1 = require("../entity");
class OrderFactory {
    create(cartExist, userId, orderDto) {
        const newOrder = new entity_1.NewOrder();
        newOrder.address = orderDto.address;
        newOrder.userId = userId;
        newOrder.items = cartExist.items;
        newOrder.paymentMethod = utils_1.Payment.cash;
        newOrder.status = utils_1.StatusOrder.pending;
        newOrder.totalPrice = cartExist.totalPrice;
        return newOrder;
    }
}
exports.OrderFactory = OrderFactory;
