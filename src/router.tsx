import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import FavoritesPages from "./views/FavoritesPages";
import Layout from "./layouts/Layout";

export default function AppRouter() {
  return (
    <BrowserRouter> {/* Nos permite crear nuestro router */}
      <Routes> {/* Grupo de rutas y cada ruta colocarla en el componente de Route */}
        <Route element={<Layout />}> {/** Podemos abrir ambas etiquetas (apertura y cierre) y colocar por ejemplo el layout para que se comparta con todas las rutasque se encuentren dentro de la etiqueta Route */}
          <Route // Componente de ruta */
            path="/" //!La pagina principal siempre es "/"
            element={<IndexPage />} // element es el componente que se va a cargar
            index //*Opciòn para indicar que con esta pàgina arranca el proyecto
          />
          <Route path="/favoritos" element={<FavoritesPages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
