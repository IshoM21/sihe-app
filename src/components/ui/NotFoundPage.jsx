import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {

    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <h1>Pagina No Encontrada</h1>
            <button
                className='btn btn-primary'
                onClick={ handleBack }
            >Regresar</button>
        </div>
    )
}
