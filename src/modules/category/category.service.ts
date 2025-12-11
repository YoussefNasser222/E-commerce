import { Request, Response } from "express";
import { CategoryRepository } from "../../DB";
import { ConflictException, NotFoundException } from "../../utils";
import { CategoryDTO } from "./category.DTO";
import { log } from "console";

class CategoryService {
  private readonly categoryRepository = new CategoryRepository();

  public addCategory = async (req: Request, res: Response) => {
    // get data from req
    const categoryDTO: CategoryDTO = req.body;
    const name = categoryDTO.name.toLowerCase().trim();
    log(name)
    // check category existence
    const categoryExist = await this.categoryRepository.getOne({
      name,
    });
    if (categoryExist) {
      throw new ConflictException("category already existence");
    }
    const createCategory = await this.categoryRepository.create({
      name ,
    });
    return res.status(201).json({
      message: "category created successfully",
      success: true,
      data: { createCategory },
    });
  };
  public deleteCategory = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // check category exist
    const categoryExist = await this.categoryRepository.getOne({ _id: id });
    if (!categoryExist) {
      throw new NotFoundException("category not found");
    }
    await this.categoryRepository.deleteOne({ _id: id });
    return res.sendStatus(204);
  };
  public updateCategory = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    const { name } = req.body;
    const categoryExist = await this.categoryRepository.getOne({ _id: id });
    if (!categoryExist) {
      throw new NotFoundException("category not found");
    }
    // update category
    const updatedCategory = await this.categoryRepository.update(
      { _id: id },
      { name }
    );
    return res.sendStatus(204);
  };
  public getAllCategory = async (req: Request, res: Response) => {
    const category = await this.categoryRepository.getAll();
    return res
      .status(200)
      .json({ message: "done", success: true, data: { category } });
  };
  public getSpecifyCategory = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // check category existence
    const categoryExist = await this.categoryRepository.getOne({ _id: id });
    if (!categoryExist) {
      throw new NotFoundException("category not found");
    }
    return res
      .status(200)
      .json({ message: "done", success: true, data: { categoryExist } });
  };
}

export default new CategoryService();
