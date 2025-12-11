import { IOrder } from "../../../utils";
import { AbstractRepository } from "../../abstraction.repository";
import { Order } from "./order.model";

export class OrderRepository extends AbstractRepository<IOrder> {
  constructor() {
    super(Order);
  }
}
