import { z } from "zod";

export const CategoriesAPIReponseSchema = z.object({
  drinks: z.array(
    z.object({
      strCategory: z.string(),
    })
  ),
});
