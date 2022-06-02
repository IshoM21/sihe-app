import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import logoCoppel from './LogoCoppel.jpg'
import '../login/LoginScreen.css'
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import Swal from 'sweetalert2'

export const ReestablecePass = () => {

    const navigate = useNavigate()
    const { token } = useParams()
    const { dispatch } = useContext( AuthContext )
    const [isLoading, setIsLoading] = useState(false)
    const [datosEmpleado, setDatosEmpleado] = useState([])
    const [enviando, setEnviando] = useState(false)
    const handleLogout = () => {
        const action = {
            type: types.logout
        }
        dispatch(action)
        navigate('/system/login', {
            replace:true
        })
    }
    useEffect(() => {
        const obtenerDatosEmpleado = async () => {
            try {
                console.log("============");
                const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/empleados/resetConstrasenia`, JSON.stringify(token), { headers: { 'Content-Type': 'application/json' } })
                console.log(data);
                const empleado = data.empleado
                console.log(empleado);
                setDatosEmpleado(empleado)
            } catch (error) {
                if (error.response.status === 403) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Credenciales vencidas.',
                        icon: 'error',
                        confirmButtonText: 'Iniciar sesion'
                    })
                }
            }
        }
        obtenerDatosEmpleado()
    }, [])
    const initialState = {
        password: ''
    };
    console.log(datosEmpleado);
    const [formValues, handleInputChange] = useForm(initialState);
    const { password } = formValues
    const handleReset = (e) => {
        e.preventDefault()
        console.log(datosEmpleado)
        // console.log(datosEmpleado);
        console.log(isLoading)
        setIsLoading(!isLoading)
        console.log(isLoading)
        try {
            setEnviando(true)
            const datosNew = {
                ...datosEmpleado,
                password: password
            }
            const urlUpdate = `${process.env.REACT_APP_API_URL}/empleados/empleadosupdate/${datosNew.id}`;
            console.log(urlUpdate);
            axios.put(`${urlUpdate}`, JSON.stringify(datosNew), { headers: { 'Authorization': token, 'Content-Type': 'application/json' } })
                .then((response) => {
                    console.log("===============================");
                    console.log(datosEmpleado)
                    console.log(datosNew)
                    console.log(response)
                    console.log("===============================");
                    
                        Swal.fire({
                            icon: 'success',
                            title: 'Contraseña Cambiada!',
                            text: 'Su contraseña se ha cambiado exitosamente.',
                            timer: 1500,
                            showConfirmButton: true
                        })
                        handleLogout()
                        setEnviando(false)
                })

        } catch (error) {
            if (error.response.status === 403) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Credenciales vencidas.',
                    icon: 'error',
                    confirmButtonText: 'Iniciar sesion'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(() => {
                            handleLogout()
                        }, 500);
                    }
                })
            }
        }
    }

    const handleSesion = () => {
        navigate('/system/login', {
            replace: true
        })

    }



    return (
        <div className="vh-auto login mt-5" >
            <div className="container-fluid h-custom">
                <div className="login">
                    <div className="col-md-9 col-lg-6 col-xl-5  mx-auto">
                        <img src={logoCoppel} className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mx-auto">
                        <form onSubmit={handleReset}>

                            <h4 className='form-label text-center'>Ingrese su nueva contraseña</h4>
                            <div className=" mb-4">
                                <input type="password" className="form-control form-control-lg"
                                    placeholder="Contraseña" name='password' id='password' value={password} onChange={handleInputChange} />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <input type="submit" value="Enviar codigo de recuperación" className="btn btn-primary btn-lg w-100" disabled={ enviando }>

                                </input>
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
