"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
class CartService {
    constructor() {
        this.cartRepository = new DB_1.CartRepository();
        this.productRepository = new DB_1.ProductRepository();
        this.addToCart = async (req, res) => {
            const addToCartDto = req.body;
            let quantity = addToCartDto.quantity ?? 1;
            const productExist = await this.productRepository.getOne({
                _id: addToCartDto.productId,
            });
            if (!productExist) {
                throw new utils_1.NotFoundException("product not found");
            }
            let price = productExist.priceAfterDiscount || productExist.price;
            let cartExist = await this.cartRepository.getOne({
                userId: req.user._id,
            });
            if (!cartExist) {
                cartExist = (await this.cartRepository.create({
                    userId: req.user._id,
                    items: [],
                }));
            }
            const itemIndex = cartExist.items.findIndex((item) => item.productId.toString() === addToCartDto.productId.toString());
            if (itemIndex > -1) {
                const currentQuantity = cartExist.items[itemIndex].quantity;
                const newQuantity = currentQuantity + quantity;
                if (productExist.stock < newQuantity) {
                    throw new utils_1.BadRequestException(`Available : ${productExist.stock}`);
                }
                cartExist.items[itemIndex].quantity = newQuantity;
                cartExist.items[itemIndex].price = price;
            }
            else {
                if (productExist.stock < quantity) {
                    throw new utils_1.BadRequestException(`Available : ${productExist.stock}`);
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
        this.getMyCart = async (req, res) => {
            const userId = req.user._id;
            const cartExist = await this.cartRepository.getOne({ userId }, {}, {
                populate: [
                    { path: "userId", select: "firstName lastName" },
                    { path: "items.productId", select: "name brand" },
                ],
            });
            if (!cartExist) {
                throw new utils_1.NotFoundException("cart not found");
            }
            return res
                .status(200)
                .json({ message: "done", success: true, data: { cartExist } });
        };
        this.removeItem = async (req, res) => {
            const { productId } = req.body;
            const userId = req.user._id;
            await this.cartRepository.update({ userId }, { $pull: { items: { productId } } });
            const updatedCart = await this.cartRepository.getOne({ userId });
            if (!updatedCart) {
                throw new utils_1.NotFoundException("cart not found");
            }
            updatedCart.totalPrice = this.calculateTotalPrice(updatedCart.items);
            updatedCart.save();
            return res.sendStatus(204);
        };
        this.clearCart = async (req, res) => {
            const userId = req.user._id;
            const cartExist = await this.cartRepository.getOne({ userId });
            if (!cartExist) {
                return res.sendStatus(204);
            }
            await this.cartRepository.deleteOne({ userId });
            return res.sendStatus(204);
        };
    }
    calculateTotalPrice(items) {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}
exports.default = new CartService();
