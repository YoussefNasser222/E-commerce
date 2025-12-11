import { ObjectId } from "mongoose";
import { IOrderItem, Payment, StatusOrder } from "../../../utils";

export class NewOrder {
    userId: ObjectId;
      address: {
        city: string;
        street: string;
        building: string;
      };
      totalPrice: number;
      paymentMethod: Payment;
      status: StatusOrder;
      items: IOrderItem[];
}