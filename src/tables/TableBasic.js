import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const darkTheme = createTheme({
    palette: {
        mode:'dark'
    }
})

export class TableBasic extends React.Component {
    render() {
        const columns = ["Nombre", "Empresa", "Ciudad", "Estado",{
            name:"Acciones",
            options:{
                customBodyRender: (value, tableMeta, updateValue) => <button id={Object.values( tableMeta)}>Eliminar</button>,
            }
        }]
        const data = [
            {
                'noEmpleado': '99091234',
                'nombre':'Luis Enrique Moo', 
                'email':'luis.moo@coppel.com',
                'perfil':'programador',
                'rol':'admin'
            },
            {
                'noEmpleado': '99095678',
                'nombre':'Luis Alberto Beltran', 
                'email':'luis.beltran@coppel.com',
                'perfil':'programador',
                'rol':'admin'
            },
            {
                'noEmpleado': '99191234',
                'nombre':'Luis Angel', 
                'email':'luis.angel@coppel.com',
                'perfil':'programador',
                'rol':'user'
            },
            {
                'noEmpleado': '99095678',
                'nombre':'Luis Alberto Beltran', 
                'email':'luis.beltran@coppel.com',
                'perfil':'programador',
                'rol':'admin'
            },
            {
                'noEmpleado': '99191234',
                'nombre':'Luis Angel', 
                'email':'luis.angel@coppel.com',
                'perfil':'programador',
                'rol':'user'
            },
            {
                'noEmpleado': '99095678',
                'nombre':'Luis Alberto Beltran', 
                'email':'luis.beltran@coppel.com',
                'perfil':'programador',
                'rol':'admin'
            },
            {
                'noEmpleado': '99191234',
                'nombre':'Luis Angel', 
                'email':'luis.angel@coppel.com',
                'perfil':'programador',
                'rol':'user'
            },
            {
                'noEmpleado': '99095678',
                'nombre':'Luis Alberto Beltran', 
                'email':'luis.beltran@coppel.com',
                'perfil':'programador',
                'rol':'admin'
            },
            {
                'noEmpleado': '99191234',
                'nombre':'Luis Angel', 
                'email':'luis.angel@coppel.com',
                'perfil':'programador',
                'rol':'user'
            },
            {
                'noEmpleado': '99095678',
                'nombre':'Luis Alberto Beltran', 
                'email':'luis.beltran@coppel.com',
                'perfil':'programador',
                'rol':'admin'
            },
            {
                'noEmpleado': '99191234',
                'nombre':'Luis Angel', 
                'email':'luis.angel@coppel.com',
                'perfil':'programador',
                'rol':'user'
            },
            {
                'noEmpleado': '99095678',
                'nombre':'Luis Alberto Beltran', 
                'email':'luis.beltran@coppel.com',
                'perfil':'programador',
                'rol':'admin'
            },
            {
                'noEmpleado': '99191234',
                'nombre':'Luis Angel', 
                'email':'luis.angel@coppel.com',
                'perfil':'programador',
                'rol':'user'
            },
            {
                'noEmpleado': '99095678',
                'nombre':'Luis Alberto Beltran', 
                'email':'luis.beltran@coppel.com',
                'perfil':'programador',
                'rol':'admin'
            },
            {
                'noEmpleado': '99191234',
                'nombre':'Luis Angel', 
                'email':'luis.angel@coppel.com',
                'perfil':'programador',
                'rol':'user'
            },
            {
                'noEmpleado': '99095678',
                'nombre':'Luis Alberto Beltran', 
                'email':'luis.beltran@coppel.com',
                'perfil':'programador',
                'rol':'admin'
            },
            {
                'noEmpleado': '99191234',
                'nombre':'Luis Angel', 
                'email':'luis.angel@coppel.com',
                'perfil':'programador',
                'rol':'user'
            },
            {
                'noEmpleado': '99095678',
                'nombre':'Luis Alberto Beltran', 
                'email':'luis.beltran@coppel.com',
                'perfil':'programador',
                'rol':'admin'
            },
            {
                'noEmpleado': '99191234',
                'nombre':'Luis Angel', 
                'email':'luis.angel@coppel.com',
                'perfil':'programador',
                'rol':'user'
            }
        ]
        const options = { filterType: 'textField', download:false, print:false, viewColumns:false, filter:false, responsive:'simple'}

        return(
            <ThemeProvider theme={darkTheme}>
                <MUIDataTable 
                    title={"Lista de empleados"}
                    data={data}
                    columns={columns}
                    options={options}
                    
                />
            </ThemeProvider>
        )
    }
    
}