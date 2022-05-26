import { display } from '@mui/system';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';


export const Navbar = () => {

    const {user} = useContext(AuthContext)
    const hideItem = user.rol !== 'Admin'
    console.log(hideItem);
    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <Link
                    className="navbar-brand"
                    to="home"
                >
                    Home
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Catálogos
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                                <li className="nav-item"><NavLink
                                    className="nav-item nav-link"
                                    to="empleados"
                                >Empleados</NavLink></li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-item nav-link"
                                        to="perfiles"
                                    >Perfiles</NavLink></li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-item nav-link"
                                        to="centros"
                                    >Centros</NavLink></li>
                            </ul>
                        </li>

                        <li 
                            className="nav-item link"
                            // className={ () => 'nav-item link ' + (hideItem && 'd-none')}
                            hidden={hideItem}
                        >
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Habilidades
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                                <li className="nav-item"> <NavLink
                                    className="nav-item nav-link"
                                    to="lenguajes"
                                >Habilidades Lenguajes Programacion</NavLink></li>
                                <li className="nav-item"><NavLink
                                    className="nav-item nav-link"
                                    to="componentes">Habilidades Componentes</NavLink></li>
                            </ul>

                        </li>
                        <NavLink
                            className="nav-item nav-link"
                            to="requerimientos"
                        >
                            Requerimientos
                        </NavLink>
                        <NavLink
                            className="nav-item nav-link"
                            to="reportes"
                        >
                            Reportes
                        </NavLink>
                    </ul>
                </div>
            </div >
        </nav >
    )
}