import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const HeaderSistema = () => {

    const navigate = useNavigate()

    const { dispatch } = useContext( AuthContext )

    const handleLogout = () => {
        const action = {
            type: types.logout
        }
        dispatch(action)
        navigate('/system/login', {
            replace:true
        })
    }
    return (
        <div className='navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex flex-row justify-content-between px-2'>
            <h2><strong>Sistema Interno de Habilidades de Empleados</strong></h2>
            <button className='nav-item nav-link btn' onClick={ handleLogout }>
                Salir
            </button>
        </div>
    )
}
