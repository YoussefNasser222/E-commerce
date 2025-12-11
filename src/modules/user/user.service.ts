import { Request, Response } from "express";
import { UserRepository } from "../../DB";
import { NotFoundException, UnAuthorizedException } from "../../utils";
import { UserFactory } from "../auth/factory";
import { UpdateUserDTO } from "./user.dto";
import { Types } from "mongoose";

class UserService {
  private readonly userRepository = new UserRepository();
  private readonly userFactory = new UserFactory();

  public getUser = async (req: Request, res: Response) => {
    const id = req.user._id;
    const userExist = await this.userRepository.getOne({ _id: id });
    if (!userExist) throw new NotFoundException("user not found");
    return res
      .status(200)
      .json({ message: "done", success: true, data: { user: userExist } });
  };
  public updateUser = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    if (req.user._id.toString() !== id.toString())
      throw new UnAuthorizedException("un authorized user");
    const updateUserDto: UpdateUserDTO = req.body;
    const userExist = await this.userRepository.getOne({ _id: req.user._id });
    const updateDate = await this.userFactory.updateUser(
      updateUserDto,
      userExist
    );
    await this.userRepository.updateMany({ _id: req.user._id }, updateDate);
    return res.sendStatus(204);
  };
}

export default new UserService();
