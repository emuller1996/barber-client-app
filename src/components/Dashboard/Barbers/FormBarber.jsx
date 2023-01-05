import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function FormBarber() {

    const [barberCreated, setBarberCreated] = useState({
        name: '',
        role: '',
        image: ''
    });
    const [services, setServices] = useState([]);
    const [servicesSelected, setServicesSelected] = useState([]);

    useEffect(() => {
        getServices();

    }, [])


    const getServices = async () => {
        setServices(undefined);

        const result = await axios.get(`/services/`);
        setServices(result.data.services);
        console.log(result.data.services);

    };

    const handleInputBarber = (e) => {

        setBarberCreated({ ...barberCreated, [e.target.name]: e.target.value })
    }

    const handleInputServicesAppointment = (e) => {
        console.log("handleInputServicesAppointment");
        console.log(e.target.value);
        const servicesIn = servicesSelected.find((t) => t === e.target.value);
        if (servicesIn) {
            setServicesSelected(servicesSelected.filter((t) => t !== e.target.value));
        } else {
            setServicesSelected([...servicesSelected, e.target.value]);
        }
    };

    const handleSubmitCreate = async(e) => {
        e.preventDefault();
        console.log('create ')
        let data = {};
        Object.assign(data,barberCreated,{services : servicesSelected})
        console.log(data)


        

        try {
            const result = await axios.post('/barber',data);
            toast.success('🦄 Wow so easy!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            
        } catch (error) {
            toast.error(`${error.message}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            
        }

        





    }

    return (

        <form onSubmit={handleSubmitCreate}>
            <div class="modal-header border-0">
                <h5 class="modal-title" id="modalBaber">Crear Barbero</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body border-0">
                <div class="row ">
                    <div class="form-group col-md-6">
                        <label for="nameBarber">Nombre barbero</label>
                        <input type="text" class="form-control input-appointment" name="name" value={barberCreated.name ? barberCreated.name : ''} onChange={handleInputBarber} id="nameBarber" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="roleBarber">Rol barbero</label>
                        <input type="text" class="form-control input-appointment"  name="role" value={barberCreated.role ? barberCreated.role : ''} onChange={handleInputBarber} id="roleBarber" />
                    </div>
                    <div class="form-group col-12">
                        <label for="imageBarber">Imagen barbero</label>
                        <input type="url" class="form-control input-appointment" name="image" value={barberCreated.image ? barberCreated.image : ''} onChange={handleInputBarber} id="imageBarber" />
                    </div>
                    <div class="form-group col-12">
                        <span >Servicios</span>
                        <div className="row">


                            {services && services.length > 0 && services.map(s => (
                                <div className="col-md-6 col-xl-4">
                                    <label className='w-100' htmlFor={s.name}>
                                        <div className="card w-100 rounded-0">
                                            <div class="card-header bg-light">
                                                <input onClick={handleInputServicesAppointment} className="float-right mt-1" type="checkbox" name="services" id={s.name} value={s._id} />
                                                <span>{s.name}</span>
                                            </div>
                                        </div>

                                    </label>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-secondary rounded-0" data-dismiss="modal"><i class="fas fa-window-close  mr-2"></i> Cerrar</button>
                <button type="submit" class="btn btn-success rounded-0"> <i class="fas fa-save mr-2"></i>Guardar Barbero</button>
            </div>
        </form>
    )
}