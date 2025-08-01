import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: ""
  });
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const searchRecipies = useAppStore((state) => state.searchRecipies);
  const showNotification = useAppStore(state => state.showNotification);
  const categories = useAppStore((state) => state.categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
    })
  }

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validar
    if(Object.values(searchFilters).includes("")){
      showNotification({
        text: "Todos los campos son obligatorios",
        error: true
      })
      return;
    }

    //Consultar las recetas
    searchRecipies(searchFilters)
  }
  return (
    <header
      className={
        isHome ? "bg-[url('/bg.jpg')] bg-center bg-cover" : "bg-slate-800"
      }
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>

          <nav className="flex gap-4">
            {/* 
                    Al hacer click con una etiqueta con href, se da un "flashaso" que quita performance a nuestro proyecto
                    <a href="/">Inicio</a>
                    <a href="/favoritos">Favoritos</a>
            */}
            {/* 
              //* Para corregir lo previo tenemos lo siguiente: 
                <Link to="/" className="text-white uppercase font-bold">
                  Inicio
                </Link>
                <Link to="/favoritos" className="text-white uppercase font-bold">
                  Favoritos
                </Link>
            */}
            {/* Si se requiere, tambien se puede utilizar NavLink, el cual contiene un callback para resaltar la pagina actual */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
            <NavLink
              to="/generate"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Generar con IA
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <>
            <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6" onSubmit={handleSumbit}>
              <div className="space-y-4">
                <label
                  htmlFor="ingredient"
                  className="block text-white uppercase font-extrabold text-lg"
                >
                  Nombre o ingredientes
                </label>

                <input
                  id="ingredient"
                  type="text"
                  name="ingredient"
                  className="bg-white p-3 w-full rounded-lg focus:outline-none"
                  placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, Café"
                  onChange={handleChange}
                  value={searchFilters.ingredient}
                />
              </div>

              <div className="space-y-4">
                <label
                  htmlFor="category"
                  className="block text-white uppercase font-extrabold text-lg"
                >
                  Categoría
                </label>

                <select
                  id="category"
                  name="category"
                  className="bg-white p-3 w-full rounded-lg focus:outline-none"
                  onChange={handleChange}
                  value={searchFilters.category}

                >
                  <option value="">-- Seleccione --</option>

                  {categories.drinks.map((drink) => (
                    <option key={drink.strCategory} value={drink.strCategory}>
                      {drink.strCategory}
                    </option>
                  ))}
                </select>

                <input
                  type="submit"
                  value="Buscar recetas"
                  className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                />
              </div>
            </form>
          </>
        )}
      </div>
    </header>
  );
}
