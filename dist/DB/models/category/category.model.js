"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const category_schema_1 = require("./category.schema");
exports.Category = (0, mongoose_1.model)("Category", category_schema_1.categorySchema);
