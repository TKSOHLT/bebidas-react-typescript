import { z } from 'zod';
import { CategoriesAPIReponseSchema } from '../utils/recipes-schema';

export type Categories = z.infer<typeof CategoriesAPIReponseSchema>