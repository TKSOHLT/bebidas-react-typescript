import { useMemo } from "react";
import Header from "../components/Header";
import { useAppStore } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";

export default function IndexPage() {

  const drinks = useAppStore((state) => state.drinks)
  const hasDrinks = useMemo(()=> drinks.drinks.length > 0,[drinks])
  return (
    <>
    <h1 className="text-6xl font-extrabold">Recetas</h1>

    {
      hasDrinks ? (
        <>
          {drinks.drinks.map((drink)=>(
            <DrinkCard key={drink.idDrink} drink={drink}/>
          ))}
        </>
      ) : (
        <>
        <p className="my-10 text-center text-2xl">
          No hay resultados aún, utilizando el formulario para buscar recetas.
        </p>
        </>
      )
    }
    </>
  )
}
