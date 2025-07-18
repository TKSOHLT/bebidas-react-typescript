//**
// !Múltiples stores:
// A medida que una app va creciendo, se tienen dos opciones para manejar los stores:
//  1. Crear múltiples stores (anteriormente recomendado)
//  2. Utilizar Slice Pattern (recomendado actualmente)
// 
//* En este caso vamos a utilizar Slice Pattern, en donde se dividen los stores en pequeñas piezas 
//* y se unifican en el store principal
//**/

//!A esto se le conoce como: **Slice Pattern**
import {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipesSlice, type RecipiesSliceType } from './recipeSlice';
import { type FavoritesSliceType, createFavoritesSlice } from './favoriteSlice'
import { type NotificationSliceType, createNotificationSlice } from './notificationSlice'
import { createAISlice, type AISlice } from './aiSlice';

export const useAppStore = create<RecipiesSliceType & FavoritesSliceType & NotificationSliceType & AISlice>()(devtools((...a)=> ({//con "..a" esta tomando una copia de los argumentos (set, get, etc...) y los podemos pasar a nuestros slices
    ...createRecipesSlice(...a), // De este modo se está aplicando el slice (parte de un store mayor) al store padre
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})))