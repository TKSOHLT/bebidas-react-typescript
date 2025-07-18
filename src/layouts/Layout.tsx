import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal"

// * 
// * Outlet: Mantener lo que tiene el layout pero inyecta el contenido de las demas views
// *

export default function Layout() {
  return (
    <>
    <Header />
    <Modal />
    <Outlet /> {/* El outlet es el contenido de cada una de las paginas, si no se pone, las demas paginas no se inyectan */} 
    </>
  )
}
