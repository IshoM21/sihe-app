import { Routes, Route } from "react-router-dom";

import { Navbar } from "../components/ui/Navbar"
import { Centros } from "../components/catalogos/Centros";
import { Empleados } from "../components/catalogos/Empleados";
import { Perfiles } from "../components/catalogos/Perfiles";
import { HabilidadesComponentesScreen } from "../components/habilidades/HabilidadesComponentesScreen";
import { HabilidadesLenguajesScreen } from "../components/habilidades/HabilidadesLenguajesScreen";
import { ReportesScreen } from "../components/reportes/ReportesScreen";
import { RequerimientosScreen } from "../components/requerimientos/RequerimientosScreen";
import { HeaderSistema } from "../components/ui/HeaderSistema";
import { HeaderUsuario } from "../components/ui/HeaderUsuario";
import { Home } from "../components/ui/Home";
import { NotFoundPage } from "../components/ui/NotFoundPage";
import { Coordinaciones } from "../components/catalogos/Coordinaciones";
import { AgregarEmpleado } from "../components/catalogos/empleados/AgregarEmpleado";
import { EditarEmpleado } from "../components/catalogos/empleados/EditarEmpleado";



export const DashboardRoutes = () => {
    return (
        <>
            <HeaderSistema />
            <HeaderUsuario />
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="*" element={<NotFoundPage/>}/>
                    <Route path="empleados" element={<Empleados />} />
                    <Route path="empleados/add" element={<AgregarEmpleado />} />
                    <Route path="empleados/edit/:id" element={<EditarEmpleado />} />
                    <Route path="centros" element={<Centros />} />
                    <Route path="perfiles" element={<Perfiles />} />
                    <Route path="coordinaciones" element={<Coordinaciones />} />
                    <Route path="lenguajes" element={<HabilidadesLenguajesScreen />} />
                    <Route path="componentes" element={<HabilidadesComponentesScreen />} />
                    <Route path="requerimientos" element={<RequerimientosScreen />} />
                    <Route path="reportes" element={<ReportesScreen />} />
                    <Route path="home" element={<Home />} />
                </Routes>
            </div>
        </>
    )
}
