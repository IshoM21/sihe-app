import axios from 'axios';
const getPerfiles = async (token) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/perfil/consultaperfiles`;
        const promise =  await axios.get(url, {
            headers: {
                'Authorization': token
            }
        })
        return promise.data
    } catch (error) {
        console.log(error);
    }
}

const getCentros = async (token) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/centrosdev/consultalistacentrosdev`;
        const promise =  await axios.get(url, {
            headers: {
                'Authorization': token
            }
        })
        return promise.data
    } catch (error) {
        console.log(error);
    }
}
const getCoordinaciones = async (token) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/coordinacionesdev/consultalistacoordinacionesdev`;
        const promise =  await axios.get(url, {
            headers: {
                'Authorization': token
            }
        })
        return promise.data
    } catch (error) {
        console.log(error);
    }
}

const getEmpleadoById = async (token, id) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/empleados/empleado/${id}`;
        const promise =  await axios.get(url, {
            headers: {
                'Authorization': token
            }
        })
        return promise.data
    } catch (error) {
        console.log(error);
    }
}

export {
    getCentros,
    getPerfiles,
    getEmpleadoById,
    getCoordinaciones
}