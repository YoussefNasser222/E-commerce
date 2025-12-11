import { ICategory } from "../../../utils";
import { AbstractRepository } from "../../abstraction.repository";
import { Category } from "./category.model";

export class CategoryRepository extends AbstractRepository<ICategory> {
  constructor() {
    super(Category);
  }
}
