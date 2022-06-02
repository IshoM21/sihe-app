
import { TableJson } from "../../tables/TableJson";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../auth/authContext'
import axios from 'axios';
import Swal from "sweetalert2";
import { types } from "../../types/types";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup"
import { MensajeAlert } from "../ui/MensajeAlert";
export const Perfiles = () => {
    const { user } = useContext(AuthContext)
    const { token } = user
    const [perfiles, setPerfiles] = useState([])
    const [isOpen, setIsOpen] = useState(false)
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
                const url = `${process.env.REACT_APP_API_URL}/perfil/deleteperfil/${idCentro}`;
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
                        const arrayCentros = perfiles.filter(perfil => perfil.idPerfil !== idCentro)
                        setPerfiles(arrayCentros)
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
        const obtenerPerfiles = async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/perfil/consultaperfiles`;
                console.log(url);
                axios.get(`${url}`, {
                    headers: {
                        'Authorization': token
                    }
                })
                    .then(({ data }) => {
                        console.log(data);
                        setPerfiles(data)
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

        obtenerPerfiles();
    }, [])

    const handleLogout = () => {
        const action = {
            type: types.logout
        }
        dispatch(action)
        navigate('/system/login', {
            replace: true
        })
    }

    const columnas = [
        {
            name: "idPerfil",
            label: "ID Perfil",
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
            name: "su",
            label: "Superusuario",
            options: {
                filter: false,
                sort: false,
                empty: true,
                display: 'hide'
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
                            onClick={() => handleDelete(perfiles[dataIndex].id)}
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
                        // onClick={() => { navigate('edit/' + centros[dataIndex].id, { replace: true }) }}
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
    const handleClose = () => {
        console.log('Cerrando Modal')
        handleOpen()
    }

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleSubmit = (valores) => {
        console.log(valores);
        const { id, descripcion, su } = valores
        const data = { "descripcion": descripcion, "idPerfil": parseInt(id), "su": su }
        console.log(data);
        const url = `${process.env.REACT_APP_API_URL}/perfil/addperfil`
        axios.post(`${url}`, JSON.stringify(data), {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                console.log(response.data);
                console.log(perfiles);
                const newArray = [...perfiles, data]
                setPerfiles(newArray)
                console.log(perfiles);
                // handleReset()
                const cancelar = document.getElementById('btnCancel')
                cancelar.click()
                Swal.fire({
                    icon: 'success',
                    title: 'Empleado agregado con exito!',
                    timer: 1500,
                    confirmButtonColor: '#3085d6'
                })
            })
            .catch(function (error) {
                console.log(error);
                console.log(error.response);
                console.log(error.message);
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
                if (error.response.status === 500) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error Interno.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                const cancelar = document.getElementById('btnCancel')
                                cancelar.click()
                            }
                        })
                    // .then((result) => {
                    //     if (result.isConfirmed) {
                    //         setTimeout(() => {
                    //             handleLogout()

                    //         }, 1500);
                    //     }
                    // })
                }
            })
    }

    const handleReset = (resetForm) => {
        resetForm();
    };



    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
                <h3>Lista de Perfiles</h3>
                {/* <NavLink
                    className="btn btn-primary"
                    to="add"
                >Agregar Perfil</NavLink> */}
                <Button variant="contained" data-bs-toggle="modal" data-bs-target="#modalAdd">Agregar Perfil</Button>
            </div>
            <TableJson data={perfiles} columnas={columnas} options={options} />

            {/* Modal Agregar */}
            <div class="modal fade" id="modalAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Agregar Nuevo Perfil</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <Formik
                                initialValues={{
                                    id: '',
                                    descripcion: '',
                                    su: false
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
                                                        <label htmlFor="id">ID de Perfil:</label>
                                                        <Field
                                                            type="text" id="id" name="id" className="form-control blockquote bg-light" placeholder="ID Perfil"
                                                        />
                                                        {errors.id && touched.id ? (
                                                            <MensajeAlert>{errors.id}</MensajeAlert>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-12 col-sm-12">
                                                        <label htmlFor="descripcion">Descripción:</label>
                                                        <Field
                                                            type="text" id="descripcion" name="descripcion" className="form-control blockquote bg-light" placeholder="Descripción del perfil"
                                                        />
                                                        {errors.descripcion && touched.descripcion ? (
                                                            <MensajeAlert>{errors.descripcion}</MensajeAlert>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-12 col-sm-12">
                                                        <label htmlFor="descripcion">Superusurio:</label>
                                                        <div className="form-check form-switch">
                                                            <Field className="form-check-input" type="checkbox" id="su" name="su" />
                                                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                                                Si
                                                            </label>
                                                        </div>
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
