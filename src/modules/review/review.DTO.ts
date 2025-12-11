export interface ReviewDTO {
    productId : string;
    rating : number;
    comment : string
}

export interface UpdateReviewDTO {
    rating? : number;
    comment? : string
}