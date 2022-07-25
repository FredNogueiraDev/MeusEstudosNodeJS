import { Category } from "../model/category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";


class PostgresCategoriesRepository implements ICategoriesRepository{
    findByName(name: string): Category {
        throw new Error("Method 'findByName' not implemented.");
    }
    list(): Category[] {
        throw new Error("Method 'list' not implemented.");
    }
    create({ name, description }: ICreateCategoryDTO): void {
        throw new Error("Method 'create' not implemented.");
    }

}

export { PostgresCategoriesRepository }