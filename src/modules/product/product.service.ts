import { log } from "console";
import { Request, Response } from "express";
import { ProductRepository } from "../../DB";
import { NotFoundException } from "../../utils";
import {
  deleteFileFromCloud,
  uploadFileToCloud,
  uploadManyFileToCloud,
} from "../../utils/cloudinary";
import { ProductFactory } from "./factory";
import { AddProductDTO, UpdateProductDto } from "./product.DTO";
import path from "path";

class ProductService {
  private readonly productRepository = new ProductRepository();
  private readonly productFactory = new ProductFactory();

  public addProduct = async (req: Request, res: Response) => {
    let addProductDto: AddProductDTO = req.body;
    addProductDto.name = addProductDto.name.toLowerCase();
    addProductDto.createdBy = req.user._id;

    // upload main image
    const filePath = req.file.path;
    const folder = `E-commerce/product/${addProductDto.name}`;
    const { public_id, secure_url } = await uploadFileToCloud(filePath, folder);
    // log(secure_url, public_id);
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
  public updateProduct = async (req: Request, res: Response) => {
    // get data from req
    let updateProductDTO: UpdateProductDto = req.body;
    updateProductDTO.updatedBy = req.user._id;
    const { id } = req.params;
    const productExist = await this.productRepository.getOne({ _id: id });
    if (!productExist) {
      throw new NotFoundException("product not found");
    }
    const files = req.files as Express.Multer.File[];
    if (productExist.images && productExist.images.length > 0) {
      await deleteFileFromCloud(
        `E-commerce/product/${productExist.name}/images`
      );
    }
    const paths = files.map((file) => file.path);
    const folder = `E-commerce/product/${productExist.name}/images`;
    const uploads = await uploadManyFileToCloud(paths, folder);
    const result = uploads.map((file) => ({
      public_id: file.public_id,
      secure_url: file.secure_url,
    }));
    updateProductDTO.images = updateProductDTO.images || [];
    updateProductDTO.images.push(...result);
    const updatedProductFactory = this.productFactory.updateProduct(
      updateProductDTO,
      productExist
    );
    const updatedProduct = await this.productRepository.update(
      { _id: id },
      updatedProductFactory
    );
    return res.status(200).json({
      message: "updated product successfully",
      success: true,
      data: { result },
    });
  };
  public deleteProduct = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    const productExist = await this.productRepository.getOne({ _id: id });
    if (!productExist) {
      throw new NotFoundException("product not found");
    }
    await deleteFileFromCloud(`E-commerce/product/${productExist.name}`);
    await this.productRepository.deleteOne({ _id: id });
    return res.sendStatus(204);
  };
  public getAllProduct = async (req: Request, res: Response) => {
    const products = await this.productRepository.getAll(
      {},
      {},
      {
        populate: [
          { path: "createdBy", select: "firstName lastName" },
          { path: "categoryId", select: "name" },
          { path: "updatedBy", select: "firstName lastName" },
        ],
      },
      { price: 1 }
    );
    return res
      .status(200)
      .json({ message: "done", success: true, data: { products } });
  };
  public getSpecificProduct = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    const productExist = await this.productRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: "createdBy", select: "firstName lastName" },
          { path: "updatedBy", select: "firstName lastName" },
          { path: "categoryId", select: "name" },
        ],
      }
    );
    if (!productExist) {
      throw new NotFoundException("product not found");
    }
    return res
      .status(200)
      .json({ message: "done", success: true, data: { productExist } });
  };
  public searchProduct = async (req: Request, res: Response) => {
    // get data from req
    let { name } = req.body;
    name = name.toLowerCase();
    const product = await this.productRepository.getAll({
      name: { $regex: `${name}`, $options: "i" },
    },{},{populate : [
      { path: "createdBy", select: "firstName lastName" },
        { path: "updatedBy", select: "firstName lastName" },
        { path: "categoryId", select: "name" },
    ]});
    if (product.length === 0) {
      throw new NotFoundException("product not found");
    }
    return res
      .status(200)
      .json({ message: "done", success: true, data: { product } });
  };
}

export default new ProductService();
