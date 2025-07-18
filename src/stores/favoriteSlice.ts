import { type StateCreator } from "zustand";
import type { Recipe } from "../types";
import { createRecipesSlice, type RecipiesSliceType } from "./recipeSlice"; //Consumir otro slice dentro de este slice (NO RECOMENDABLE)
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

// export const createFavoritesSlice : StateCreator<FavoritesSliceType> = (set, get, api) => ({
export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipiesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  //De este modo estamos conectando el recipeSlite con este favoriteSlice a esto se le conoce como ** nested slices **
  favorites: [],
  handleClickFavorite: (recipe) => {
    //* Con "get()" se pueden obtener todas las funciones de aquí, es como utilizar un this
    // console.log(get().favorites) // De este modo se puede obtener el favorites de este slice
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se eliminó de favoritos",
        error: false,
      });
    } else {
      //!Esto es correcto
      // set({
      //     favorites: [...get().favorites, recipe]
      // })

      //!Esto tambien es correcto
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se agregó a favoritos.",
        error: false,
      });
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
    createRecipesSlice(set, get, api).closeModal();
  },
  favoriteExist: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});
