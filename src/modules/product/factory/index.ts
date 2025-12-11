import { IProduct } from "../../../utils";
import { NewProduct } from "../entity";
import { AddProductDTO, UpdateProductDto } from "../product.DTO";

export class ProductFactory {
  addProduct(product: AddProductDTO) {
    const newProduct = new NewProduct();

    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.price = product.price;
    newProduct.priceAfterDiscount = product.priceAfterDiscount;
    newProduct.stock = product.stock ?? 0;
    newProduct.sold = 0;
    newProduct.mainImage = product.mainImage;
    newProduct.images = product.images;
    newProduct.brand = product.brand;
    newProduct.categoryId = product.categoryId;
    newProduct.createdBy = product.createdBy;
    newProduct.updatedBy = product.updatedBy;
    return newProduct;
  }
  updateProduct(updateProductDTo: UpdateProductDto, productExist: IProduct) {
    productExist.name = updateProductDTo.name ?? productExist.name;
    productExist.brand = updateProductDTo.brand ?? productExist.brand;
    productExist.categoryId =
      updateProductDTo.categoryId ?? productExist.categoryId;
    productExist.createdBy =
      updateProductDTo.createdBy ?? productExist.createdBy;
    productExist.description =
      updateProductDTo.description ?? productExist.description;
    productExist.images = updateProductDTo.images ?? productExist.images;
    productExist.mainImage =
      updateProductDTo.mainImage ?? productExist.mainImage;
    productExist.price = updateProductDTo.price ?? productExist.price;
    productExist.priceAfterDiscount =
      updateProductDTo.priceAfterDiscount ?? productExist.priceAfterDiscount;
    productExist.sold = updateProductDTo.sold ?? productExist.sold;
    productExist.stock = updateProductDTo.sold
      ? productExist.stock - updateProductDTo.sold
      : productExist.stock;
    productExist.updatedBy =
      updateProductDTo.updatedBy ?? productExist.updatedBy;
    return productExist;
  }
}
