import { Request, Response } from "express";
import { CartRepository, OrderRepository, ProductRepository } from "../../DB";
import {
  BadRequestException,
  IOrder,
  IOrderItem,
  NotFoundException,
  Role,
  StatusOrder,
  UnAuthorizedException,
} from "../../utils";
import { OrderFactory } from "./factory";
import { OrderDTO } from "./order.DTO";

class OrderService {
  private readonly orderRepository = new OrderRepository();
  private readonly cartRepository = new CartRepository();
  private readonly orderFactory = new OrderFactory();
  private readonly productRepository = new ProductRepository();

  public createOrder = async (req: Request, res: Response) => {
    // get data from req
    const orderDto: OrderDTO = req.body;
    const userId = req.user._id;
    // check cartExist
    const cartExist = await this.cartRepository.getOne({ userId });
    if (!cartExist || cartExist.items.length === 0) {
      throw new BadRequestException("your cart is empty");
    }
    const productIds = cartExist.items.map((item) => item.productId);
    const productExist = await this.productRepository.getAll({
      _id: { $in: productIds },
    });
    // check product stock
    const productMap = new Map(
      productExist.map((product) => [product._id.toString(), product])
    );
    const outOfStock = cartExist.items.find((item) => {
      const product = productMap.get(item.productId.toString());
      return !product || product.stock < item.quantity;
    });
    if (outOfStock) {
      throw new BadRequestException(
        `product ${outOfStock.productId} is not available`
      );
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
  public getMyOrder = async (req: Request, res: Response) => {
    // get data from req
    const userId = req.user._id;
    const order = await this.orderRepository.getOne(
      { userId, status: StatusOrder.pending },
      {},
      {
        populate: [
          { path: "userId", select: "firstName lastName" },
          { path: "items.productId", select: "name" },
        ],
      }
    );
    if (!order) {
      throw new NotFoundException("order not found");
    }
    return res
      .status(200)
      .json({ message: "done", success: true, data: { order } });
  };
  public getAllOrder = async (req: Request, res: Response) => {
    const orders = await this.orderRepository.getAll();
    if (!orders || orders.length === 0) {
      throw new NotFoundException("orders is empty");
    }
    return res
      .status(200)
      .json({ message: "done", success: true, data: { orders } });
  };
  public updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = await this.orderRepository.getOne({ _id: id });
    if (!order) {
      throw new NotFoundException("order not found");
    }
    await this.orderRepository.update({ _id: id }, { status });
    return res.sendStatus(204);
  };
  public cancelOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await this.orderRepository.getOne({ _id: id });
    if (!order) {
      throw new NotFoundException("order not found");
    }
    if(req.user._id.toString() !== order.userId.toString() || req.role != Role.admin){
      throw new UnAuthorizedException("you not allowed to cancel this order")
    }
    const stock = order.items.map((item) =>
      this.productRepository.update(
        { _id: item.productId },
        {
          $inc: {
            stock: item.quantity,
            sold: -item.quantity,
          },
        }
      )
    );
    await Promise.all(stock);
    await this.orderRepository.update(
      { _id: id },
      {
        status: StatusOrder.canalled,
      }
    );
    return res.sendStatus(204);
  };
  public deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const orderExist = await this.orderRepository.getOne({
      _id: id,
      status: StatusOrder.canalled,
    });
    if (!orderExist) {
      throw new NotFoundException("Order not found");
    }
    await this.orderRepository.deleteOne({
      _id: id,
      status: StatusOrder.canalled,
    });
    return res.sendStatus(204);
  };
}

export default new OrderService();
