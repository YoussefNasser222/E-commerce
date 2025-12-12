import { Express, NextFunction, Request, Response } from "express";
import rateLimit, { Options } from "express-rate-limit";
import { connectDB } from "./DB";
import {
  authRouter,
  cartRouter,
  categoryRouter,
  orderRouter,
  productRouter,
  reviewRouter,
  userRouter,
} from "./modules/index";
import cors from "cors";
import { BadRequestException, errorHandler } from "./utils";
export function bootstrap(app: Express, express: any) {
  app.use(
    cors({
      origin: "*",
    })
  );
  // handel rate limit
  const limiter = rateLimit({
    windowMs: 5 * 60 * 100, // 5 minutes
    limit: 5,
    // skipSuccessfulRequests: true,
    handler: (
      req: Request,
      res: Response,
      next: NextFunction,
      options: Options
    ) => {
      throw new BadRequestException(options.message);
    },
  });
  // app.use("/auth" , limiter)
  // connect db
  connectDB();
  app.use(express.json());
  app.use("/auth", limiter, authRouter);
  app.use("/user", userRouter);
  app.use("/category", categoryRouter);
  app.use("/product", productRouter);
  app.use("/cart", cartRouter);
  app.use("/order", limiter, orderRouter);
  app.use("/review", limiter, reviewRouter);
  //   handle invalid api
  app.use("/{*dummy}", (req: Request, res: Response, next: NextFunction) => {
    return res.status(400).json({ message: "invalid api", success: false });
  });

  //   error handler
  app.use(errorHandler);
}
