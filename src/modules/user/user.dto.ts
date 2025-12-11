import { Gender } from "../../utils";

export interface UpdateUserDTO {
    firstName? : string;
    lastName? : string;
    password? : string;
    email? : string ;
    dob? : Date;
    gender? : Gender;
}