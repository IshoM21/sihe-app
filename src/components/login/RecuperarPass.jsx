import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import logoCoppel from './LogoCoppel.jpg'
import '../login/LoginScreen.css'
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import Swal from 'sweetalert2'

export const RecuperaPass = () => {

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const initialState = {
        email: ''
    };
    const [formValues, handleInputChange] = useForm(initialState);
    const [enviando, setEnviando] = useState(false)
    const { email } = formValues
    const handleReset = async (e) => {
        e.preventDefault()
        console.log(isLoading)
        setIsLoading(!isLoading)
        console.log(isLoading)
        try{
            setEnviando(true)
            const data = { "correo": email, "path": `${process.env.REACT_APP_RUTA_RESTAURACION_PASS}/` }
            console.log(data);
            const url = `${process.env.REACT_APP_API_URL}/empleados/recuperaConstrasenia`
            console.log(url)
            const resultado = await axios.post(`${url}`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})
            setIsLoading(false)
            console.log(isLoading)
            Swal.fire({
                icon: 'success',
                title: 'Codigo enviado!',
                text: 'Se ha enviado un correo con las instrucciones para recuperar su contraseña.',
                timer: 1500,
                showConfirmButton: true
            })
            setEnviando(false)
            setTimeout(() => {
                handleSesion()
            }, 1550);
        } catch(error){
            if (error.response.status === 403) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Ingrese su correo vinculado a la cuenta.',
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                })
                setEnviando(false)
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

                        <h4 className='form-label text-center'>Ingrese su correo para continuar</h4>
                        <div className=" mb-4">
                            <input type="email" className="form-control form-control-lg"
                                placeholder="Correo" name='email' id='email' value={email} onChange={handleInputChange} />
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
