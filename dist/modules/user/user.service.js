"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const factory_1 = require("../auth/factory");
class UserService {
    constructor() {
        this.userRepository = new DB_1.UserRepository();
        this.userFactory = new factory_1.UserFactory();
        this.getUser = async (req, res) => {
            const id = req.user._id;
            const userExist = await this.userRepository.getOne({ _id: id });
            if (!userExist)
                throw new utils_1.NotFoundException("user not found");
            return res
                .status(200)
                .json({ message: "done", success: true, data: { user: userExist } });
        };
        this.updateUser = async (req, res) => {
            const { id } = req.params;
            if (req.user._id.toString() !== id.toString())
                throw new utils_1.UnAuthorizedException("un authorized user");
            const updateUserDto = req.body;
            const userExist = await this.userRepository.getOne({ _id: req.user._id });
            const updateDate = await this.userFactory.updateUser(updateUserDto, userExist);
            await this.userRepository.updateMany({ _id: req.user._id }, updateDate);
            return res.sendStatus(204);
        };
    }
}
exports.default = new UserService();
