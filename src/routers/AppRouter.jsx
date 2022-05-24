import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";
import { NotFoundPage } from "../components/ui/NotFoundPage";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={ <NotFoundPage />} />
                <Route path="/" element={
                    <PublicRoute>
                        <LoginScreen/>
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
