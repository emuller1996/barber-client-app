import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function DetailService() {

    const params = useParams();
    const history = useHistory();
    const [service, setService] = useState();



    useEffect(() => {
        getService()
    }, [])


    const getService = async () => {

        try {

            const result = await axios.get(`/services/${params.idService}`);
            console.log(result.data.service);
            setService(result.data.service);

        } catch (error) {
            toast.error(error.message)
        }




    }

    return (
        <div className="container bg-light">
            <button onClick={ () => { history.goBack() } } type="button" class="close float-right py-1" aria-label="Close">
            <i class="fas fa-arrow-left"></i>
            </button>
            <h5>Detalles del Servicios   {service ? service.name : ' . . .'  }</h5>
            
            <div className="row"></div>
        </div>
    )
}