"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
class OrderService {
    constructor() {
        this.orderRepository = new DB_1.OrderRepository();
        this.cartRepository = new DB_1.CartRepository();
        this.orderFactory = new factory_1.OrderFactory();
        this.productRepository = new DB_1.ProductRepository();
        this.createOrder = async (req, res) => {
            const orderDto = req.body;
            const userId = req.user._id;
            const cartExist = await this.cartRepository.getOne({ userId });
            if (!cartExist || cartExist.items.length === 0) {
                throw new utils_1.BadRequestException("your cart is empty");
            }
            const productIds = cartExist.items.map((item) => item.productId);
            const productExist = await this.productRepository.getAll({
                _id: { $in: productIds },
            });
            const productMap = new Map(productExist.map((product) => [product._id.toString(), product]));
            const outOfStock = cartExist.items.find((item) => {
                const product = productMap.get(item.productId.toString());
                return !product || product.stock < item.quantity;
            });
            if (outOfStock) {
                throw new utils_1.BadRequestException(`product ${outOfStock.productId} is not available`);
            }
            for (const item of cartExist.items) {
                const product = productMap.get(item.productId.toString());
                if (product) {
                    product.stock -= item.quantity;
                    product.sold += item.quantity;
                    await product.save();
                }
            }
            const newOrder = this.orderFactory.create(cartExist, userId, orderDto);
            const createdOrder = await this.orderRepository.create(newOrder);
            await this.cartRepository.deleteOne({ userId });
            return res
                .status(201)
                .json({ message: "done", success: true, data: { createdOrder } });
        };
        this.getMyOrder = async (req, res) => {
            const userId = req.user._id;
            const order = await this.orderRepository.getOne({ userId, status: utils_1.StatusOrder.pending }, {}, {
                populate: [
                    { path: "userId", select: "firstName lastName" },
                    { path: "items.productId", select: "name" },
                ],
            });
            if (!order) {
                throw new utils_1.NotFoundException("order not found");
            }
            return res
                .status(200)
                .json({ message: "done", success: true, data: { order } });
        };
        this.getAllOrder = async (req, res) => {
            const orders = await this.orderRepository.getAll();
            if (!orders || orders.length === 0) {
                throw new utils_1.NotFoundException("orders is empty");
            }
            return res
                .status(200)
                .json({ message: "done", success: true, data: { orders } });
        };
        this.updateOrder = async (req, res) => {
            const { id } = req.params;
            const { status } = req.body;
            const order = await this.orderRepository.getOne({ _id: id });
            if (!order) {
                throw new utils_1.NotFoundException("order not found");
            }
            await this.orderRepository.update({ _id: id }, { status });
            return res.sendStatus(204);
        };
        this.cancelOrder = async (req, res) => {
            const { id } = req.params;
            const order = await this.orderRepository.getOne({ _id: id });
            if (!order) {
                throw new utils_1.NotFoundException("order not found");
            }
            if (req.user._id.toString() !== order.userId.toString() || req.role != utils_1.Role.admin) {
                throw new utils_1.UnAuthorizedException("you not allowed to cancel this order");
            }
            const stock = order.items.map((item) => this.productRepository.update({ _id: item.productId }, {
                $inc: {
                    stock: item.quantity,
                    sold: -item.quantity,
                },
            }));
            await Promise.all(stock);
            await this.orderRepository.update({ _id: id }, {
                status: utils_1.StatusOrder.cancelled,
            });
            return res.sendStatus(204);
        };
        this.deleteOrder = async (req, res) => {
            const { id } = req.params;
            const orderExist = await this.orderRepository.getOne({
                _id: id,
                status: utils_1.StatusOrder.cancelled,
            });
            if (!orderExist) {
                throw new utils_1.NotFoundException("Order not found");
            }
            await this.orderRepository.deleteOne({
                _id: id,
                status: utils_1.StatusOrder.cancelled,
            });
            return res.sendStatus(204);
        };
    }
}
exports.default = new OrderService();
