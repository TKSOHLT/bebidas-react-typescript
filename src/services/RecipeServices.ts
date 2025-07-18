import { CategoriesAPIReponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import type { Drink, SearchFilter } from "../types";
import api from "../lib/axios";

export async function getCategories() {
    const url = "/list.php?c=list";
    const {data} = await api.get(url);
    const result = CategoriesAPIReponseSchema.safeParse(data);
    if(result.success){
        return result.data;
    }
}

export async function getRecipies(filters: SearchFilter) {
    const url = `/filter.php?c=${filters.category}&i=${filters.ingredient}`;
    const { data } = await api.get(url);
    const result = DrinksAPIResponse.safeParse(data);
    if(result.success){
        return result.data;
    }
}

export async function getRecipeById(id: Drink['idDrink']) {
    const url = `/lookup.php?i=${id}`;
    const { data } = await api.get(url);
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
    if(result.success){
        return result.data;
    }
}