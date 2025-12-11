import { ProjectionType, QueryFilter, QueryOptions } from "mongoose";
import { IProduct } from "../../../utils";
import { AbstractRepository } from "../../abstraction.repository";
import { Product } from "./product.model";

export class ProductRepository extends AbstractRepository<IProduct> {
  constructor() {
    super(Product);
  }
}
