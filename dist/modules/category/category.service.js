"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const console_1 = require("console");
class CategoryService {
    constructor() {
        this.categoryRepository = new DB_1.CategoryRepository();
        this.addCategory = async (req, res) => {
            const categoryDTO = req.body;
            const name = categoryDTO.name.toLowerCase().trim();
            (0, console_1.log)(name);
            const categoryExist = await this.categoryRepository.getOne({
                name,
            });
            if (categoryExist) {
                throw new utils_1.ConflictException("category already existence");
            }
            const createCategory = await this.categoryRepository.create({
                name,
            });
            return res.status(201).json({
                message: "category created successfully",
                success: true,
                data: { createCategory },
            });
        };
        this.deleteCategory = async (req, res) => {
            const { id } = req.params;
            const categoryExist = await this.categoryRepository.getOne({ _id: id });
            if (!categoryExist) {
                throw new utils_1.NotFoundException("category not found");
            }
            await this.categoryRepository.deleteOne({ _id: id });
            return res.sendStatus(204);
        };
        this.updateCategory = async (req, res) => {
            const { id } = req.params;
            const { name } = req.body;
            const categoryExist = await this.categoryRepository.getOne({ _id: id });
            if (!categoryExist) {
                throw new utils_1.NotFoundException("category not found");
            }
            const updatedCategory = await this.categoryRepository.update({ _id: id }, { name });
            return res.sendStatus(204);
        };
        this.getAllCategory = async (req, res) => {
            const category = await this.categoryRepository.getAll();
            return res
                .status(200)
                .json({ message: "done", success: true, data: { category } });
        };
        this.getSpecifyCategory = async (req, res) => {
            const { id } = req.params;
            const categoryExist = await this.categoryRepository.getOne({ _id: id });
            if (!categoryExist) {
                throw new utils_1.NotFoundException("category not found");
            }
            return res
                .status(200)
                .json({ message: "done", success: true, data: { categoryExist } });
        };
    }
}
exports.default = new CategoryService();
