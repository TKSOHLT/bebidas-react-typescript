import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

//!Aumento de performance:
//Al hacerce un build de la app, react pone todo en un solo archivo que descarga el cliente
//Lo que singifica que si aun no ha visitado una pagina, esta ya se habrá cargado dando como resultado
//una carga inicial lenta al usuario. PAra ello tenemos:
// import FavoritesPages from "./views/FavoritesPages";
const FavoritesPages = lazy(() => import("./views/FavoritesPages"));
// import IndexPage from "./views/IndexPage";
const IndexPage = lazy(() => import("./views/IndexPage"));
//* Se hace un lazy import para mejorar el performance */

export default function AppRouter() {
  return (
    <BrowserRouter>
      {" "}
      {/* Nos permite crear nuestro router */}
      <Routes>
        {" "}
        {/* Grupo de rutas y cada ruta colocarla en el componente de Route */}
        <Route element={<Layout />}>
          {" "}
          {/** Podemos abrir ambas etiquetas (apertura y cierre) y colocar por ejemplo el layout para que se comparta con todas las rutasque se encuentren dentro de la etiqueta Route */}
          <Route // Componente de ruta */
            path="/" //!La pagina principal siempre es "/"
            element={
              <Suspense
                fallback="Cargando..." // El fallback es interesante, se puede poner un spinner o algo en lo que se descarga el componente
              >
                <IndexPage />
              </Suspense>
            } // element es el componente que se va a cargar
            index //*Opciòn para indicar que con esta pàgina arranca el proyecto
          />
          <Route
            path="/favoritos"
            element={
              <Suspense
                fallback="Cargando..." // El fallback es interesante, se puede poner un spinner o algo en lo que se descarga el componente
              >
                <FavoritesPages />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
