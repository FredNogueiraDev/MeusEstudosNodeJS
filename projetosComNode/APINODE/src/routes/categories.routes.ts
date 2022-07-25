import { request, response, Router } from 'express';

import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

import { CategoriesRepository } from '../modules/cars/repositories/categoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository()


categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(categoriesRepository);

    createCategoryService.execute({name, description})

    return response.status(201).send(  );
})
categoriesRoutes.get("/", (request, response) => {
    const all = categoriesRepository.list();

    return response.json(all);
})

export { categoriesRoutes };