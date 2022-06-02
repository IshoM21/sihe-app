import React from 'react'

export const MensajeAlert = ({children}) => {
    return (
        <div className='text-center mb-1 bg-danger text-white fw-bold text-uppercase rounded'>
            {children}
        </div>
    )
}
