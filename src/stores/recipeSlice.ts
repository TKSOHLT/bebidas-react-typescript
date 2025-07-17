//* Parte de useAppStore (slice)

import type { StateCreator } from "zustand"
import { getCategories, getRecipies } from "../services/RecipeServices"
import type { Categories, Drinks, SearchFilter } from "../types"

export type RecipiesSliceType = { //Este type tambien se tiene que utilizar en el store padre, para poder recibir los parametros que tiene este slice
    categories: Categories,
    drinks: Drinks,
    fetchCategories: () => Promise<void>,
    searchRecipies: (searchFilter: SearchFilter) => Promise<void>
}

export const createRecipesSlice : StateCreator<RecipiesSliceType> = ((set)=> ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
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
    }
}))