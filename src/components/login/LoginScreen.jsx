import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import logoCoppel from './LogoCoppel.jpg'
import '../login/LoginScreen.css'
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import Swal from 'sweetalert2'

export const LoginScreen = () => {

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)
    const initialState = {
        email: '',
        password: ''
    };
    const [formValues, handleInputChange] = useForm(initialState);
    const { email, password } = formValues
    const [enviando, setEnviando] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault()
        setEnviando(true)
        const data = { "idEmpleado": email, password }
        console.log(data);
        var token = ''
        const url = `${process.env.REACT_APP_API_URL}/empleados/authenticate`
        console.log(url)
        axios.post(`${url}`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(({ data }) => {
                console.log(data);
                if (data.token === "") {
                    setEnviando(false)
                    return Swal.fire({
                        title: 'Error!',
                        text: 'Credenciales Incorrectas',
                        icon: 'error',
                        confirmButtonText: 'Cerrar'

                    })
                }
                token = data.token
                console.log(token);
                Swal.fire({
                    icon: 'success',
                    title: 'Inició sesion con éxito!',
                    timer: 1000,
                    showConfirmButton: false
                })

                setTimeout(() => {
                    setEnviando(false)
                    handleSesion()
                }, 1200);
            })
            .catch(function (error) {
                if (error.response.status === 403) {
                    setEnviando(false)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Credenciales Incorrectas.',
                        icon: 'error',
                        confirmButtonText: 'Cerrar'
                    })
                } else if (error.response.status === 500) {
                    setEnviando(false)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Ingrese su numero de usuario.',
                        icon: 'error',
                        confirmButtonText: 'Cerrar'
                    })
                }else if (error.response.status === 400) {
                    setEnviando(false)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Ingrese su contraseña.',
                        icon: 'error',
                        confirmButtonText: 'Cerrar'
                    })
                }
            });
        const handleSesion = () => {
            var nombre = ''
            var admin = false
            var action = {}
            if (token !== "") {
                const url = `${process.env.REACT_APP_API_URL}/empleados/empleado/${email}`
                axios.get(`${url}`, {
                    headers: {
                        'Authorization': token
                    }
                })
                .then(({ data }) => {
                    console.log(data);
                    nombre = `${data.primerNombre} ${data.apellidoPaterno}`
                    console.log(nombre);
                    admin = data.idPerfil.su
                    console.log(admin);
                    action = {
                        type: types.login,
                        payload: {
                            name: nombre,
                            admin: admin,
                            token: token
                        }
                    }
                    console.log(action);
                    dispatch(action)
                    const lastPath = localStorage.getItem('lastPath') || '/dashboard/home'
                    navigate(lastPath, {
                        replace: true
                    })
                })
                .catch((response, error) => {
                    setEnviando(false)
                    console.log(response);
                    console.log(error);
                });
            }
        }

    }


    return (
        <div className="vh-auto login mt-5" >
            <div className="container-fluid h-custom">
                <div className="login">
                    <div className="col-md-9 col-lg-6 col-xl-5  mx-auto">
                        <img src={logoCoppel} className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mx-auto">
                        <form>

                            <div className=" mb-4">
                                <label htmlFor="email" className='form-label'>Usuario</label>
                                <input type="email" className="form-control form-control-lg"
                                    placeholder="Ingresa tu usuario" name='email' id='email' value={email} onChange={handleInputChange} />
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">Contraseña</label>
                                <input type="password" name='password' id='password' className="form-control form-control-lg"
                                    placeholder="Contraseña" value={password} onChange={handleInputChange} />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                </div>
                                <NavLink 
                                    to="/system/recuperapass"
                                >
                                    ¿Olvidaste tu contraseña?
                                </NavLink>
                                <a href="#!" className='pe-1'></a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg w-100" onClick={handleLogin} disabled={enviando}>
                                    Iniciar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <div className="position-fixed w-100  bottom-0 d-flex flex-row flex-md-row text-center text-md-start justify-content-center py-4 px-4  px-xl-5 copyright ">
                <div className="text-white mb-3 mb-md-0 " >
                    Copyright © 2020. All rights reserved Prueba.
                </div>
            </div>
        </div>
    )
}
