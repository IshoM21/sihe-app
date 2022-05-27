import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import logoCoppel from './LogoCoppel.jpg'
import '../login/LoginScreen.css'

export const LoginScreen = () => {

    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const url = 'http://localhost:4000/'
            console.log(url);
            const respuesta = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({"username": "", "password":"123"})
            })
            const {toke} = await respuesta.json()
            console.log(toke);
        }catch (error){
            console.log(JSON.stringify(error))
        }

        if(toke != ""){
            try{
                const url = 'http://localhost:4000/'
                console.log(url);
                const respuesta = await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({"token": respuesta})
                })
                const datos = await datos.json()
                console.log(JSON.stringify(datos))
            }catch(error){
                console.log(JSON.stringify(error))
            }

            dispatch(action)
            const lastPath = localStorage.getItem('lastPath') || '/dashboard/home'
            navigate(lastPath,{
                replace:true
            })
        }

        //dispatch(action)
        //const lastPath = localStorage.getItem('lastPath') || '/dashboard/home'
        //navigate(lastPath,{
           // replace:true
        //})
    }


    return (
        <div class="vh-auto login" >
            <div class="container-fluid h-custom">
                <div class="login">
                    <div class="col-md-9 col-lg-6 col-xl-5 ">
                    <img src={logoCoppel} class="img-fluid" alt="Sample image"/>
                    </div>
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form>
        
                    <div class="form-outline mb-4">
                        <input type="email" id="form3Example3" class="form-control form-control-lg"
                        placeholder="Ingresa tu usuario" />
                        <label class="form-label" for="form3Example3">Usuario</label>
                    </div>
        
                        <div class="form-outline mb-3">
                        <input type="password" id="form3Example4" class="form-control form-control-lg"
                            placeholder="Contraseña" />
                        <label class="form-label" for="form3Example4">Contraseña</label>
                        </div>
        
                        <div class="d-flex justify-content-between align-items-center">
                        <div class="form-check mb-0">
                        </div>
                        <a href="#!" class="text-body">¿Olvidaste tu contraseña?</a>
                        </div>
        
                        <div class="text-center text-lg-start mt-4 pt-2">
                        <button type="button" class="btn btn-primary btn-lg" onClick={ handleLogin }>
                            Iniciar
                        </button>
                        </div>
        
                    </form>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4  px-xl-5 copyright">
                <div class="text-white mb-3 mb-md-0 " >
                    Copyright © 2020. All rights reserved Prueba.
                </div>
            </div>
        </div>
    )
}
