
import { TableJson } from "../../tables/TableJson";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../auth/authContext'
import axios from 'axios';
import Swal from "sweetalert2";
import { types } from "../../types/types";
import { NavLink, useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';

export const Empleados = () => {
    const { user } = useContext(AuthContext)
    const { token } = user
    const [empleados, setEmpleados] = useState([]);
    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)
    const handleReload = () => {

    }
    const handleDelete = (numEmpleado) => {
        // console.log(numEmpleado);
        Swal.fire({
            title: '¿Está seguro?',
            text: "Esta acción no puede ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `${process.env.REACT_APP_API_URL}/empleados/empleadosdelete/${numEmpleado}`;
                axios.delete(`${url}`, {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },

                })
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado correctamente!',
                            timer: 1500,
                            confirmButtonColor: '#3085d6'
                        })
                        const arrayEmpleados = empleados.filter(empleado => empleado.id !== numEmpleado)
                        setEmpleados(arrayEmpleados)
                    })
                    .catch(function (error) {
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

                                    }, 1500);
                                }
                            })
                        }
                    });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }


    useEffect(() => {
        const obtenerEmpleados = async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/empleados/empleadosall`;
                console.log(url);
                axios.get(`${url}`, {
                    headers: {
                        'Authorization': token
                    }
                })
                    .then(({ data }) => {
                        console.log(data);
                        setEmpleados(data)
                    })
                    .catch((error) => {
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

                                    }, 1500);
                                }
                            })
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        };

        obtenerEmpleados();
    }, [])

    const handleLogout = () => {
        const action = {
            type: types.logout
        }
        dispatch(action)
        navigate('/', {
            replace: true
        })
    }

    const columnas = [
        {
            name: "id",
            label: "# Empleado",
            options: {
                filter: false,
                sort: false,
                empty: true,
            },
        },
        {
            name: "primerNombre",
            label: "# Empleado",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <p>
                            {empleados[dataIndex].primerNombre + " " + empleados[dataIndex].segundoNombre
                                + " " + empleados[dataIndex].apellidoPaterno + " " + empleados[dataIndex].apellidoMaterno}
                        </p>
                    );
                },
            },
        },
        {
            name: "segundoNombre",
            options: {
                filter: false,
                empty: true,
                display: 'hide'
            },
        },
        {
            name: "apellidoPaterno",
            options: {
                filter: false,
                empty: true,
                display: 'hide'
            },
        },
        {
            name: "apellidoMaterno",
            options: {
                filter: false,
                empty: true,
                display: 'hide'
            },
        },
        {
            name: "correo",
            label: "Correo",
            options: {
                filter: false,
                sort: false,
                empty: true,
            },
        },
        {
            name: "Perfil",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <p>
                            {empleados[dataIndex].idPerfil.descripcion}
                        </p>
                    );
                },
            },
        },
        {
            name: "Delete",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(empleados[dataIndex].id)}
                        >
                            Delete
                        </button>
                    );
                },
            },
        },
        {
            name: "Edit",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (rawData, dataIndex, rowIndex) => {
                    return (
                        <button
                            className="btn btn-warning"
                            onClick={() => { navigate('edit/' + empleados[dataIndex].id, { replace: true }) }}
                        >
                            Edit
                        </button>
                    );
                },
            },
        },
    ];
    const options = {
        responsive: "vertical",
        tableBodyHeight: "600px",
        print: false,
        download: false,
        filter: true,
        viewColumns: false,
        selectableRowsHideCheckboxes: true,
        filterArrayFullMatch: false,
        textLabels: {
            body: {
                noMatch: "No se encontraron resultados.",
            }
        }
    };


    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
                <h3>Lista de Empleados</h3>
                <NavLink
                    className="btn btn-primary"
                    to="add"
                >Nuevo Empleado</NavLink>
            </div>
            <TableJson data={empleados} columnas={columnas} options={options} />

        </div>
    );
};
