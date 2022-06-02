
import { TableJson } from "../../tables/TableJson";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../auth/authContext'
import axios from 'axios';
import Swal from "sweetalert2";
import { types } from "../../types/types";
import { NavLink, useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { MensajeAlert } from "../ui/MensajeAlert";
import * as Yup from "yup"

export const Coordinaciones = () => {
    const { user } = useContext(AuthContext)
    const { token } = user
    const [coordinaciones, setCoordinaciones] = useState([])
    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)
    const nuevoPerfil = Yup.object().shape({
        id: Yup.string()
            .max(8, 'Maximo 8 digitos para el id.')
            .required('El id del perfil es requerido.'),
        descripcion: Yup.string()
            .min(6, 'Descripción demasiado corta.')
            .max(50, "Máximo 50 caracteres.")
            .required('La descripcion del perfil es requerida.'),
    })
    const handleDelete = (idCentro) => {
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
                const url = `${process.env.REACT_APP_API_URL}/coordinacionesdev/deletecoordinaciondev/${idCentro}`;
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
                        const arrayCoor = coordinaciones.filter(centro => centro.id !== idCentro)
                        setCoordinaciones(arrayCoor)
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
        const obtenerCentros = async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/coordinacionesdev/consultalistacoordinacionesdev`;
                console.log(url);
                axios.get(`${url}`, {
                    headers: {
                        'Authorization': token
                    }
                })
                    .then(({ data }) => {
                        console.log(data);
                        setCoordinaciones(data)
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

        obtenerCentros();
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
            label: "ID Coordinacion",
            options: {
                filter: false,
                sort: false,
                empty: true,
            },
        },
        {
            name: "descripcion",
            label: "Descripcion",
            options: {
                filter: false,
                sort: false,
                empty: true,
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
                            onClick={() => handleDelete(coordinaciones[dataIndex].id)}
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
                        // onClick={() => { navigate('edit/' + coordinaciones[dataIndex].id, { replace: true }) }}
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

    const handleSubmit = (valores) => {
        console.log(valores);
        const { id, descripcion } = valores
        const data = { "id": parseInt(id), descripcion }
        console.log(data);
        const url = `${process.env.REACT_APP_API_URL}/coordinacionesdev/addcoordinaciondev`
        axios.post(`${url}`, JSON.stringify(data), {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                console.log(response.data);
                console.log(coordinaciones);
                const newArray = [...coordinaciones, data]
                setCoordinaciones(newArray)
                console.log(coordinaciones);
                // handleReset()
                const cancelar = document.getElementById('btnCancel')
                cancelar.click()
                Swal.fire({
                    icon: 'success',
                    title: 'Coordinacion agregada con exito!',
                    timer: 1500,
                    confirmButtonColor: '#3085d6'
                })
            })
            .catch(function (error) {
                console.log(error);
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
            })
    }

    const handleReset = (resetForm) => {
        resetForm();
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
                <h3>Lista de Coordinaciones</h3>
                {/* <NavLink
                    className="btn btn-primary"
                    to="add"
                >Agregar Coordinacion</NavLink> */}
                <Button variant="contained" data-bs-toggle="modal" data-bs-target="#modalAdd">Agregar Centro </Button>
            </div>
            <TableJson data={coordinaciones} columnas={columnas} options={options} />
            {/* Modal Agregar */}
            <div class="modal fade" id="modalAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Agregar Nuevo Centro</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <Formik
                                initialValues={{
                                    id: '',
                                    descripcion: '',
                                    idCoordinacion: ''
                                }}

                                onSubmit={(values) => {
                                    handleSubmit(values)
                                }}

                                validationSchema={nuevoPerfil}
                            >
                                {
                                    ({ errors, touched, isSubmitting, resetForm }) => {
                                        return (
                                            <Form>
                                                <div className="row">
                                                    <div className="form-group col-md-12 col-sm-12">
                                                        <label htmlFor="id">ID de la Coordinacion:</label>
                                                        <Field
                                                            type="text" id="id" name="id" className="form-control blockquote bg-light" placeholder="ID Coordinacion"
                                                        />
                                                        {errors.id && touched.id ? (
                                                            <MensajeAlert>{errors.id}</MensajeAlert>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-12 col-sm-12">
                                                        <label htmlFor="descripcion">Descripción:</label>
                                                        <Field
                                                            type="text" id="descripcion" name="descripcion" className="form-control blockquote bg-light" placeholder="Descripción de la Coordinacion"
                                                        />
                                                        {errors.descripcion && touched.descripcion ? (
                                                            <MensajeAlert>{errors.descripcion}</MensajeAlert>
                                                        ) : null}
                                                    </div>
                                                    <br />
                                                    <input type="submit" value="Guardar" className='mt-4 w-100 btn btn-primary text-uppercase' />
                                                    <input type="button" id="btnCancel" onClick={resetForm} value="Cancelar" className='mt-1 w-100 btn btn-danger text-uppercase' data-bs-dismiss="modal" />
                                                </div>
                                            </Form>)
                                    }
                                }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
