//* Parte de useAppStore (slice)

import type { StateCreator } from "zustand"
import { getCategories } from "../services/RecipeServices"
import type { Categories } from "../types"

export type RecipiesSliceType = { //Este type tambien se tiene que utilizar en el store padre, para poder recibir los parametros que tiene este slice
    categories: Categories,
    fetchCategories: () => Promise<void>
}

export const createRecipesSlice : StateCreator<RecipiesSliceType> = ((set)=> ({
    categories: {
        drinks: []
    },
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    }
}))