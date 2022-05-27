import { Button } from "@mui/material";
import { TableJson } from "../../tables/TableJson";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { getEmpleadoById } from "../../helpers/metodosEmpleado";

export const Empleados = () => {
    const [empleados, setEmpleados] = useState([]);

    const initialFormNuevoEmpleado = {
        id: "",
        pNombre: "",
        sNombre: "",
        apellidoP: "",
        apellidoM: "",
        email: "",
        perfil: "",
        centro: "",
        swtExterno: false,
    };
    const initialFormEdit = {
        id: "",
        pNombre: "",
        sNombre: "",
        apellidoP: "",
        apellidoM: "",
        email: "",
        perfil: "",
        centro: "",
        swtExterno: false,
    };
    const [formNuevo, handleInputChange, resetAdd] = useForm(
        initialFormNuevoEmpleado
    );
    const [formEdit, handleInputChangeEdit, resetEdit] = useForm(initialFormEdit);
    const {
        id,
        pNombre,
        sNombre,
        apellidoP,
        apellidoM,
        email,
        perfil,
        centro,
        swtExterno,
    } = formNuevo;

    useEffect(() => {
        const obtenerEmpleados = async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/empleados`;
                console.log(url);
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                console.log(resultado);
                setEmpleados(resultado);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerEmpleados();
    }, []);

    const handleGetEmpleadoId = () => {
        getEmpleadoById(4);
    };

    const columnas = [
        {
            name: "noEmpleado",
            label: "#Empleado",
        },
        {
            name: "nombre",
            label: "Nombre",
        },
        {
            name: "email",
            label: "Correo",
        },
        {
            name: "rol",
            label: "Rol Usuario",
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
                            onClick={() => {
                                const { data } = this.state;
                                data.shift();
                                this.setState({ data });
                            }}
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
                            data-bs-toggle="modal"
                            tabIndex="-1"
                            data-bs-target="#modalAddEmpleado"
                            className="btn btn-warning"
                            onClick={() =>
                                window.alert(
                                    `Clicked "Edit" for row ${rawData.id}  ${dataIndex.id}with dataIndex of ${dataIndex}`
                                )
                            }
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
        tableBodyHeight: "300px",
        print: false,
        download: false,
        filter: false,
        viewColumns: false,
        selectableRowsHideCheckboxes: true,
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(formNuevo);
        try {
            const url = `http://localhost:4000/`;
            console.log(url);
            const respuesta = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ username: "misho", password: "123" }),
            });
            const resultado = await respuesta.json();
            console.log(resultado);
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    };
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3>Lista de Empleados</h3>
                <Button
                    data-bs-toggle="modal"
                    tabIndex="-1"
                    data-bs-target="#modalAddEmpleado"
                    variant="contained"
                    onClick={resetAdd}
                >
                    Nuevo Empleado
                </Button>
                <Button variant="contained" onClick={handleGetEmpleadoId}>
                    Obtener
                </Button>
            </div>
            <TableJson data={empleados} columnas={columnas} options={options} />

            <div
                className="modal fade"
                id="modalAddEmpleado"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Agregar empleado
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="nombre">Numero de Empleado:</label>
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        className="form-control"
                                        placeholder="Primer Nombre"
                                        value={id}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre">Primer Nombre:</label>
                                    <input
                                        type="text"
                                        id="pNombre"
                                        name="pNombre"
                                        className="form-control"
                                        placeholder="Primer Nombre"
                                        value={pNombre}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre">Segundo Nombre:</label>
                                    <input
                                        type="text"
                                        id="sNombre"
                                        name="sNombre"
                                        className="form-control"
                                        placeholder="Segundo Nombre"
                                        value={sNombre}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre">Apellido Paterno:</label>
                                    <input
                                        type="text"
                                        id="apellidoP"
                                        name="apellidoP"
                                        className="form-control"
                                        placeholder="Apellido Paterno"
                                        value={apellidoP}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre">Apellido Materno:</label>
                                    <input
                                        type="text"
                                        id="apellidoM"
                                        name="apellidoM"
                                        className="form-control"
                                        placeholder="Apellido Materno"
                                        value={apellidoM}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Ingrese un correo electronico"
                                        value={email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="perfil">Perfil:</label>
                                    <select
                                        className="form-control"
                                        id="perfil"
                                        name="perfil"
                                        value={perfil}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un tipo de perfil</option>
                                        <option value="444">Arquitecto de Software</option>
                                        <option value="77">Programador</option>
                                        <option value="68">Tester</option>
                                        <option value="1">Gerente</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="centro">Centro:</label>
                                    <select
                                        className="form-control"
                                        id="centro"
                                        name="centro"
                                        value={centro}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un Centro de Desarollo</option>
                                        <option value="230142">Centro CLCN I</option>
                                        <option value="230982">Centro CLCN IV</option>
                                        <option value="230204">Centro CLCN III</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="d-block">Externo</label>
                                    <div class="form-check form-switch">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id="swtExterno"
                                            name="swtExterno"
                                            checked={swtExterno}
                                            onChange={() => !swtExterno}
                                        />
                                        <label
                                            class="form-check-label"
                                            htmlFor="flexSwitchCheckChecked"
                                        >
                                            Si
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSave}
                            >
                                Guardar Datos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="modalEditEmpleado"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Agregar empleado
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        className="form-control"
                                        placeholder="Nombre del empleado"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Ingrese un correo electronico"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="perfil">Perfil:</label>
                                    <select className="form-control">
                                        <option value="">Seleccione un tipo de perfil</option>
                                        <option value="444">Arquitecto de Software</option>
                                        <option value="77">Programador</option>
                                        <option value="68">Tester</option>
                                        <option value="1">Gerente</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary">
                                Guardar Datos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
