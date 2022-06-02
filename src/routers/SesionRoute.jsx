import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen"
import { RecuperaPass } from "../components/login/RecuperarPass"
import { ReestablecePass } from "../components/login/ReestablecePass";



export const SesionRoutes = () => {
    return (
        <>
            <div className="">
                <Routes>
                    <Route path="login" element={<LoginScreen />}/>
                    <Route path="recuperapass" element={<RecuperaPass />} />
                    <Route path="restore-password/:token" element={<ReestablecePass />} />
                </Routes>
            </div>
        </>
    )
}
