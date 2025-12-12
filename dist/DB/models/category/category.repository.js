"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const abstraction_repository_1 = require("../../abstraction.repository");
const category_model_1 = require("./category.model");
class CategoryRepository extends abstraction_repository_1.AbstractRepository {
    constructor() {
        super(category_model_1.Category);
    }
}
exports.CategoryRepository = CategoryRepository;
