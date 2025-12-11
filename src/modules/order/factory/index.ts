import { ObjectId } from "mongoose";
import { ICart, Payment, StatusOrder } from "../../../utils";
import { OrderDTO } from "../order.DTO";
import { NewOrder } from "../entity";

export class OrderFactory {
  create(cartExist: ICart, userId: ObjectId, orderDto: OrderDTO) {
    const newOrder = new NewOrder();
    newOrder.address = orderDto.address;
    newOrder.userId = userId;
    newOrder.items = cartExist.items;
    newOrder.paymentMethod = Payment.cash;
    newOrder.status = StatusOrder.pending;
    newOrder.totalPrice = cartExist.totalPrice;
    return newOrder;
  }
}
