import { Button } from '@mui/material';
import React from 'react'
import { TableJson } from '../../tables/TableJson'

const centros = [
    {
        'id':'2',
        'name':'Centro unico'
    },
    {
        'id':'3',
        'name':'Centro unico'
    },
    {
        'id':'4',
        'name':'Centro unico'
    },
    {
        'id':'5',
        'name':'Centro unico'
    }
]

const columnas = [
    {
        'name':'id',
        'label': 'ID Centro'
    },
    {
        'name':'name',
        'label':'Nombre del centro'
    },
    {
        name: "Delete",
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex) => {
                return (
                    <button className='btn btn-danger' onClick={() => {
                        const { data } = this.state;
                        data.shift();
                        this.setState({ data });
                    }}>
                        Delete
                    </button>
                );
            }
        }
    },
    {
        name: "Edit",
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex, rowIndex) => {
                return (
                    <button data-bs-toggle="modal" tabIndex="-1" data-bs-target="#modalAddEmpleado" className='btn btn-warning' onClick={() => window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)}>
                        Edit
                    </button>
                );
            }
        }
    },
]

export const Coordinaciones = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3>Lista de Centros de Desarrollo</h3>
                <Button data-bs-toggle="modal" tabIndex="-1" data-bs-target="#modalAddEmpleado" variant="contained">Nuevo Empleado</Button>
            </div>
            <TableJson data={centros} columnas={ columnas }  />
        </div>
    )
}
