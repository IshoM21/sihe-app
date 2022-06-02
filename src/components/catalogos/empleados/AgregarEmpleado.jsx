import { Formik, Form, Field } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../auth/authContext'
import { getCentros, getPerfiles } from '../../../helpers/getDatos'
import * as Yup from "yup"
import { MensajeAlert } from '../../ui/MensajeAlert'
import axios from 'axios';
import Swal from "sweetalert2";
import { types } from '../../../types/types'

export const AgregarEmpleado = () => {
    const { user } = useContext(AuthContext)
    const { token } = user
    const [perfiles, setPerfiles] = useState([])
    const [centros, setCentros] = useState([])
    const navigate = useNavigate()
    const { dispatch } = useContext( AuthContext )
    const handleBack = () => {
        navigate('/dashboard/empleados', {
            replace: true
        })
    }
    const handleLogout = () => {
        const action = {
            type: types.logout
        }
        dispatch(action)
        navigate('/', {
            replace: true
        })
    }
    const nuevoEmpleado = Yup.object().shape({
        id: Yup.string()
            .min(8, 'Minimo 8 caracteres')
            .required("El numero de empleado es requerido."),
        pNombre: Yup.string()
            .min(3, 'El nombre es muy corto.')
            .max(40, 'Máximo 40 caracteres')
            .required("El nombre del empleado es requerido."),
        apellidoP: Yup.string()
            .min(3, 'El apellido es muy corto.')
            .max(40, 'Máximo 40 caracteres')
            .required("El apellido paterno es requerido."),
        password: Yup.string()
            .min(6, 'Minimo 6 caracteres')
            .max(20, "Maximo 20 caracteres")
            .required("La contraseña es requerida."),
        email: Yup.string()
            .email('Email no válido.')
            .required('Email requerido'),
        perfil: Yup.string().required('Seleccione un perfil para el empleado'),
        centro: Yup.string().required('Seleccione un centro de desarrollo para el empleado')
    })
    useEffect(async () => {
        setCentros(await getCentros(token))
        setPerfiles(await getPerfiles(token))
    }, [])

    const handleSubmit = (valores) => {
        console.log(valores);
        const { id, pNombre, sNombre, apellidoP, apellidoM, email, perfil, centro, swtExterno, password } = valores
        const data = {
            "id": parseInt(id),
            "primerNombre": pNombre,
            "segundoNombre": sNombre,
            "apellidoPaterno": apellidoP,
            "apellidoMaterno": apellidoM,
            "idCentro": {
                "id": parseInt(centro)
            },
            "idPerfil": {
                "idPerfil": parseInt(perfil)
            },
            "lugarPosicion": null,
            "correo": email,
            "password": password,
            "externo": swtExterno
        }
        const url = `${process.env.REACT_APP_API_URL}/empleados/empleadossave`;
        axios.post(`${url}`, JSON.stringify(data), {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },

        })
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Empleado agregado con exito!',
                timer: 1500,
                confirmButtonColor: '#3085d6'
            })
            setTimeout(() => {
                handleBack()
            }, 1500);
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
    }
    return (
        <>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-outline-danger mt-4' onClick={handleBack}>Regresar</button>
            </div>
            <div className='card w-100 mt-4 p-4 border-1 shadow'>
                <h1 className='text-center'>Agregar Empleado</h1>
                <Formik
                    initialValues={{
                        id: '',
                        password: '',
                        pNombre: '',
                        sNombre: '',
                        apellidoP: '',
                        apellidoM: '',
                        email: '',
                        perfil: '',
                        centro: '',
                        swtExterno: false
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}

                    validationSchema={nuevoEmpleado}

                >
                    {({ errors, touched }) => {
                        return (
                            <Form>
                                <div className='row'>
                                    <div className="form-group col-md-6 col-sm-12">
                                        <label htmlFor="id">Numero de Empleado:</label>
                                        <Field
                                            type="text" id="id" name="id" className="form-control blockquote bg-light" placeholder="Numero de Empleado"
                                        />
                                        {errors.id && touched.id ? (
                                            <MensajeAlert>{errors.id}</MensajeAlert>
                                        ) : null}
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12">
                                        <label htmlFor="id">Password:</label>
                                        <Field
                                            type="password" id="password" name="password" className="form-control blockquote bg-light" placeholder="Password"
                                        />
                                        {errors.password && touched.password ? (<MensajeAlert>{errors.password}</MensajeAlert>) : null}
                                    </div>

                                    <div className="form-group col-md-6 col-sm-12">
                                        <label htmlFor="nombre">Primer Nombre:</label>
                                        <Field
                                            type="text" id="pNombre" name="pNombre" className="form-control blockquote bg-light" placeholder="Primer Nombre"
                                        />
                                        {errors.pNombre && touched.pNombre ? (<MensajeAlert>{errors.pNombre}</MensajeAlert>) : null}
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12">
                                        <label htmlFor="nombre">Segundo Nombre:</label>
                                        <Field
                                            type="text" id="sNombre" name="sNombre" className="form-control blockquote bg-light" placeholder="Segundo Nombre"
                                        />

                                    </div>
                                    <div className="form-group col-md-6 col-sm-12">
                                        <label htmlFor="nombre">Apellido Paterno:</label>
                                        <Field
                                            type="text" id="apellidoP" name="apellidoP" className="form-control blockquote bg-light" placeholder="Apellido Paterno"
                                        />
                                        {errors.apellidoP && touched.apellidoP ? (<MensajeAlert>{errors.apellidoP}</MensajeAlert>) : null}
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12">
                                        <label htmlFor="nombre">Apellido Materno:</label>
                                        <Field
                                            type="text" id="apellidoM" name="apellidoM" className="form-control blockquote bg-light" placeholder="Apellido Materno"
                                        />
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12">
                                        <label htmlFor="email">Email:</label>
                                        <Field type="email" id="email" name="email" className="form-control blockquote bg-light" placeholder="Ingrese un correo electronico"
                                        />
                                        {errors.email && touched.email ? (<MensajeAlert>{errors.email}</MensajeAlert>) : null}
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12">
                                        <label htmlFor="perfil">Perfil:</label>
                                        <Field as="select" className="form-control blockquote bg-light" id="perfil" name="perfil"
                                        >
                                            <option value="">Seleccione un tipo de perfil</option>
                                            {
                                                perfiles.map(x => (
                                                    <option key={x.idPerfil} value={x.idPerfil}>{x.descripcion}</option>
                                                ))
                                            }
                                        </Field>
                                        {errors.perfil && touched.perfil ? (<MensajeAlert>{errors.perfil}</MensajeAlert>) : null}
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12">
                                        <label htmlFor="centro">Centro:</label>
                                        <Field as="select" className="form-control blockquote bg-light" id="centro" name="centro" >
                                            <option value="">Seleccione un Centro de Desarollo</option>
                                            {
                                                centros.map(x => (
                                                    <option key={x.id} value={x.id}>{x.descripcion}</option>
                                                ))
                                            }
                                        </Field>
                                        {errors.centro && touched.centro ? (<MensajeAlert>{errors.centro}</MensajeAlert>) : null}
                                    </div>
                                    <div className="form-group col-md-6 col-sm-12">
                                        <label className="d-block">Externo</label>
                                        <div className="form-check form-switch">
                                            <Field className="form-check-input" type="checkbox" id="swtExterno" name="swtExterno" />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                                Si
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <input type="submit" value="Agregar Empleado" className='mt-4 w-100 btn btn-primary text-uppercase' />
                            </Form>
                        )
                    }}

                </Formik>
            </div>
        </>

    )
}
