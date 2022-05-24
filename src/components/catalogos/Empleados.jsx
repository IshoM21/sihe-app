
import { Button } from '@mui/material'
import { empleados } from '../../data/data'
import { TableJson } from '../../tables/TableJson'
import users from '../../tables/users.json'


export const Empleados = () => {

    const columnas = [
        {
            name: "noEmpleado",
            label: "#Empleado"
        },
        {
            name: "nombre",
            label: "Nombre"
        },
        {
            name: "email",
            label: "Correo"
        },
        {
            name: "rol",
            label: "Rol Usuario"
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
                        <button className='btn btn-warning' onClick={() => window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)}>
                            Edit
                        </button>
                    );
                }
            }
        },
    ]
    const options = {
        responsive: 'vertical',
        tableBodyHeight: '300px',
        print: false,
        download: false,
        filter: false,
        viewColumns: false,
        selectableRowsHideCheckboxes:true
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3>Lista de Empleados</h3>
                <Button data-bs-toggle="modal" tabIndex="-1" data-bs-target="#modalAddEmpleado" variant="contained">Nuevo Empleado</Button>
            </div>
            <TableJson data={empleados} columnas={columnas} options={options} />

            <div className="modal fade" id="modalAddEmpleado" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Agregar empleado</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="nombre" >Nombre:</label>
                                    <input type="text" id='nombre' name='nombre' className='form-control' placeholder='Nombre del empleado' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" >Email:</label>
                                    <input type="email" id='email' name='email' className='form-control' placeholder='Ingrese un correo electronico' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="perfil" >Perfil:</label>
                                    <select className='form-control'>
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary">Guardar Datos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}