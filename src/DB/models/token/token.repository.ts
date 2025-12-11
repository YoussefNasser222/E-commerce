import { IToken } from "../../../utils";
import { AbstractRepository } from "../../abstraction.repository";
import { Token } from "./token.model";

export class TokenRepository extends AbstractRepository<IToken> {
  constructor() {
    super(Token);
  }
}
