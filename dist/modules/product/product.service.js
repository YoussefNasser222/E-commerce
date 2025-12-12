"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const cloudinary_1 = require("../../utils/cloudinary");
const factory_1 = require("./factory");
class ProductService {
    constructor() {
        this.productRepository = new DB_1.ProductRepository();
        this.productFactory = new factory_1.ProductFactory();
        this.addProduct = async (req, res) => {
            let addProductDto = req.body;
            addProductDto.name = addProductDto.name.toLowerCase();
            addProductDto.createdBy = req.user._id;
            const filePath = req.file.path;
            const folder = `E-commerce/product/${addProductDto.name}`;
            const { public_id, secure_url } = await (0, cloudinary_1.uploadFileToCloud)(filePath, folder);
            addProductDto.mainImage = {
                public_id,
                secure_url,
            };
            addProductDto.images = [];
            const newProduct = this.productFactory.addProduct(addProductDto);
            const createdProduct = await this.productRepository.create(newProduct);
            return res.status(201).json({
                message: "product added successfully",
                success: true,
                data: { createdProduct },
            });
        };
        this.updateProduct = async (req, res) => {
            let updateProductDTO = req.body;
            updateProductDTO.updatedBy = req.user._id;
            const { id } = req.params;
            const productExist = await this.productRepository.getOne({ _id: id });
            if (!productExist) {
                throw new utils_1.NotFoundException("product not found");
            }
            const files = req.files;
            if (productExist.images && productExist.images.length > 0) {
                await (0, cloudinary_1.deleteFileFromCloud)(`E-commerce/product/${productExist.name}/images`);
            }
            const paths = files.map((file) => file.path);
            const folder = `E-commerce/product/${productExist.name}/images`;
            const uploads = await (0, cloudinary_1.uploadManyFileToCloud)(paths, folder);
            const result = uploads.map((file) => ({
                public_id: file.public_id,
                secure_url: file.secure_url,
            }));
            updateProductDTO.images = updateProductDTO.images || [];
            updateProductDTO.images.push(...result);
            const updatedProductFactory = this.productFactory.updateProduct(updateProductDTO, productExist);
            const updatedProduct = await this.productRepository.update({ _id: id }, updatedProductFactory);
            return res.status(200).json({
                message: "updated product successfully",
                success: true,
                data: { result },
            });
        };
        this.deleteProduct = async (req, res) => {
            const { id } = req.params;
            const productExist = await this.productRepository.getOne({ _id: id });
            if (!productExist) {
                throw new utils_1.NotFoundException("product not found");
            }
            await (0, cloudinary_1.deleteFileFromCloud)(`E-commerce/product/${productExist.name}`);
            await this.productRepository.deleteOne({ _id: id });
            return res.sendStatus(204);
        };
        this.getAllProduct = async (req, res) => {
            const products = await this.productRepository.getAll({}, {}, {
                populate: [
                    { path: "createdBy", select: "firstName lastName" },
                    { path: "categoryId", select: "name" },
                    { path: "updatedBy", select: "firstName lastName" },
                ],
            }, { price: 1 });
            return res
                .status(200)
                .json({ message: "done", success: true, data: { products } });
        };
        this.getSpecificProduct = async (req, res) => {
            const { id } = req.params;
            const productExist = await this.productRepository.getOne({ _id: id }, {}, {
                populate: [
                    { path: "createdBy", select: "firstName lastName" },
                    { path: "updatedBy", select: "firstName lastName" },
                    { path: "categoryId", select: "name" },
                ],
            });
            if (!productExist) {
                throw new utils_1.NotFoundException("product not found");
            }
            return res
                .status(200)
                .json({ message: "done", success: true, data: { productExist } });
        };
        this.searchProduct = async (req, res) => {
            let { name } = req.body;
            name = name.toLowerCase();
            const product = await this.productRepository.getAll({
                name: { $regex: `${name}`, $options: "i" },
            }, {}, { populate: [
                    { path: "createdBy", select: "firstName lastName" },
                    { path: "updatedBy", select: "firstName lastName" },
                    { path: "categoryId", select: "name" },
                ] });
            if (product.length === 0) {
                throw new utils_1.NotFoundException("product not found");
            }
            return res
                .status(200)
                .json({ message: "done", success: true, data: { product } });
        };
    }
}
exports.default = new ProductService();
