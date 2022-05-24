import React, { useContext } from 'react'
import { AuthContext } from '../../auth/authContext'

export const HeaderUsuario = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex flex-row justify-content-between px-2'>
                <h2>Bienvenido, {user.name} {user.rol}</h2>
        </div>
    )
}
