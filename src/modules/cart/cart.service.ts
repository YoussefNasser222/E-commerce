import { Request, Response } from "express";
import { CartRepository, ProductRepository } from "../../DB";
import {
  BadRequestException,
  ConflictException,
  ICart,
  ICartItem,
  NotFoundException,
} from "../../utils";
import { AddToCartDTO } from "./cart.DTO";
import { Document } from "mongoose";

class CartService {
  private readonly cartRepository = new CartRepository();
  private readonly productRepository = new ProductRepository();
  private calculateTotalPrice(items: ICartItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  public addToCart = async (req: Request, res: Response) => {
    // get data from req
    const addToCartDto: AddToCartDTO = req.body;
    let quantity = addToCartDto.quantity ?? 1;
    // check product existence
    const productExist = await this.productRepository.getOne({
      _id: addToCartDto.productId,
    });
    if (!productExist) {
      throw new NotFoundException("product not found");
    }
    let price = productExist.priceAfterDiscount || productExist.price;
    // check cart existence
    let cartExist: (ICart & Document) | null = await this.cartRepository.getOne(
      {
        userId: req.user._id,
      }
    );
    if (!cartExist) {
      cartExist = (await this.cartRepository.create({
        userId: req.user._id,
        items: [],
      })) as unknown as ICart & Document;
    }
    // check item existence
    const itemIndex = cartExist.items.findIndex(
      (item) => item.productId.toString() === addToCartDto.productId.toString()
    );
    if (itemIndex > -1) {
      const currentQuantity = cartExist.items[itemIndex].quantity;
      const newQuantity = currentQuantity + quantity;
      if (productExist.stock < newQuantity) {
        throw new BadRequestException(`Available : ${productExist.stock}`);
      }
      cartExist.items[itemIndex].quantity = newQuantity;
      cartExist.items[itemIndex].price = price;
    } else {
      if (productExist.stock < quantity) {
        throw new BadRequestException(`Available : ${productExist.stock}`);
      }
      const item = {
        productId: productExist._id,
        price,
        quantity,
      };
      cartExist.items.push(item);
    }
    const totalPrice = this.calculateTotalPrice(cartExist.items);
    cartExist.totalPrice = totalPrice;
    cartExist.save();
    return res.status(200).json({
      message: "add product to cart successfully",
      success: true,
      data: { cartExist },
    });
  };
  public getMyCart = async (req: Request, res: Response) => {
    // get data from req
    const userId = req.user._id;
    const cartExist = await this.cartRepository.getOne(
      { userId },
      {},
      {
        populate: [
          { path: "userId", select: "firstName lastName" },
          { path: "items.productId", select: "name brand" },
        ],
      }
    );
    if (!cartExist) {
      throw new NotFoundException("cart not found");
    }
    return res
      .status(200)
      .json({ message: "done", success: true, data: { cartExist } });
  };
  public removeItem = async (req: Request, res: Response) => {
    // get  data from req
    const { productId } = req.body;
    const userId = req.user._id;
    await this.cartRepository.update(
      { userId },
      { $pull: { items: { productId } } }
    );
    const updatedCart = await this.cartRepository.getOne({ userId });
    if (!updatedCart) {
      throw new NotFoundException("cart not found");
    }
    updatedCart.totalPrice = this.calculateTotalPrice(updatedCart.items);
    updatedCart.save();
    return res.sendStatus(204);
  };
  public clearCart = async (req: Request, res: Response) => {
    // get data from req
    const userId = req.user._id;
    const cartExist = await this.cartRepository.getOne({ userId });
    if (!cartExist) {
      return res.sendStatus(204);
    }
    await this.cartRepository.deleteOne({ userId });
    return res.sendStatus(204);
  };
}

export default new CartService();
