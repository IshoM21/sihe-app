import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";
import { RecuperaPass } from "../components/login/RecuperarPass";
import { NotFoundPage } from "../components/ui/NotFoundPage";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { SesionRoutes } from "./SesionRoute";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={ <NotFoundPage />} />
                <Route path="/system/*" element={
                    <PublicRoute>
                        <SesionRoutes />
                    </PublicRoute>
                }>

                </Route>
                {/* <Route path="/" element={<LoginScreen />} /> */}

                <Route path="/dashboard/*" element={
                    <PrivateRoute>
                        <DashboardRoutes/>
                    </PrivateRoute>
                } />
                {/* <Route path="/dashboard/*" element={<DashboardRoutes />} /> */}
            </Routes>
        </BrowserRouter>
    )
}
