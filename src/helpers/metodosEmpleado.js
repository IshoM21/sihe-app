const saveEmpleado = (data) => {

}

const getEmpleadoById = (id) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/empleados/empleado/${id}`
        console.log(url);
        // const respuesta = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
        //     body: JSON.stringify({ "username": "misho", "password": "123" })

        // })
        // const resultado = await respuesta.json()
        // console.log(resultado);
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}

export {
    getEmpleadoById
}