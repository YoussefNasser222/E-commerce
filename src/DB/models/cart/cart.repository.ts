import { ICart } from "../../../utils";
import { AbstractRepository } from "../../abstraction.repository";
import { Cart } from "./cart.model";

export class CartRepository extends AbstractRepository<ICart> {
  constructor() {
    super(Cart);
  }
}
