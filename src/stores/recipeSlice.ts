//* Parte de useAppStore (slice)

import type { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipies } from "../services/RecipeServices"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import type { FavoritesSliceType } from "./favoriteSlice"

export type RecipiesSliceType = { //Este type tambien se tiene que utilizar en el store padre, para poder recibir los parametros que tiene este slice
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchRecipies: (searchFilter: SearchFilter) => Promise<void>,
    selectRecipe: (id: Drink['idDrink']) => Promise<void>,
    closeModal: () => void
}

// export const createRecipesSlice: StateCreator<RecipiesSliceType> = ((set) => ({
export const createRecipesSlice: StateCreator<RecipiesSliceType & FavoritesSliceType, [], [], RecipiesSliceType> = ((set) => ({ //MEdiante esto se puede consumir este slice en otro slice, del otro pasando los argumentos set, get y api a esto se le conoce como ** nested slices ** 
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipies: async (filters) => {
        const drinks = await getRecipies(filters);
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id);
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
}))