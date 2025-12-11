import { IUser } from "../../../utils";
import { AbstractRepository } from "../../abstraction.repository";
import { User } from "./user.model";

export class UserRepository extends AbstractRepository<IUser> {


  constructor() {
    super(User);
  }
}
