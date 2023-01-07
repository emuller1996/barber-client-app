import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



export default function BarberDetail() {
    const params = useParams();
    const history = useHistory();
    const [barber, setBarber] = useState();

    useEffect(() => {
        getBarber()
    }, [])


    const getBarber = async () => {

        try {

            const result = await axios.get(`/barber/${params.idBarber}`);
            console.log(result.data.barber);
            setBarber(result.data.barber);

        } catch (error) {
            toast.error(error.message)
        }




    }

    return (
        <div className="container bg-light">
            <button onClick={() => { history.goBack() }} type="button" class="close float-right py-1" aria-label="Close">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h4> {barber ? barber.name : ' . . .'}</h4>

            <div className="row">
                <div className="col-6">
                    <div class="row ">
                        <div class="form-group col-12">
                            <label for="nameBarber">Nombre barbero</label>
                            <input type="text" class="form-control input-appointment" name="name" value={barber ? barber.name : ''}  id="nameBarber" />
                            
                        </div>
                        <div class="form-group col-12">
                            <label for="nameBarber">Rol barbero</label>
                            <input type="text" class="form-control input-appointment" name="name" value={barber ? barber.role : ''}  id="nameBarber" />
                            
                        </div>
                        <div class="form-group col-12">
                            <label for="nameBarber">imagen barbero</label>
                            <input type="text" class="form-control input-appointment" name="name" value={barber ? barber.image : ''}  id="nameBarber" />
                            
                        </div>
                        
                        

                    </div>

                </div>
            </div>
        </div>
    )

}