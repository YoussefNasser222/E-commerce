import { IReview } from "../../../utils";
import { AbstractRepository } from "../../abstraction.repository";
import { Review } from "./review.model";

export class ReviewRepository extends AbstractRepository<IReview>{
    constructor(){
        super(Review)
    }
}