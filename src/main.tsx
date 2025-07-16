import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)

//** React router (react-router-dom):
// React router es una de las librerias mas comunes a la hora de crear aplicaciones
// de multiples paginas y navegación.
// 
// React router es de los creadores de Remix Run (framework de react que se ejecuta en el servidor que fue adquirido por shopify)
// 
// En las últimas versiones es practicamente un framework de react.
// 
// * Caracteristicas:
//
// - Permite crear secciones con diferentes urls tales como /tienda, /productos, /login, etc
// - En versinoes recientes agregaron la posibilidad de consultar API's y procesar formularios pero esto es opcional */