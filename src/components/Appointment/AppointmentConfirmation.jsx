import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';


export default function AppointmentConfirmation() {

    const params = useParams();
    const history = useHistory();
    const [appointment, setAppointment] = useState(undefined);

    useEffect(() => {
        getAppointment()
        console.log(appointment);

    }, [])

    const getAppointment = async () => {

        const result = await axios.get(`/appointment/confirmation/${params.idCitas}`);
        console.log(result.data);
        setAppointment(result.data.appointment)

    }

    return (

        <>
            {/* <!-- Page Header Start --> */}
            <div class="page-header">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h4>Cita Agendada!</h4>
                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}

            <div className="container">

                <h5> Datos de tu cita. </h5>
                <div className="row">



                    <div className="col-md-7">


                        {appointment ?
                            (


                                <div class="card mb-3 border-0" >
                                    <div class="card-body">
                                        <h5 class="card-title">  Hola {appointment.client_id.name} tu cita ha sido agendata para la fecha {appointment.date.substring(0, 10)} en la hora {appointment.hour} </h5>

                                        <h6 class="card-subtitle mb-2 text-muted"> Muchas gracias por reservar con nosotros.  </h6>



                                    </div>

                                </div>
                            )
                            :
                            (<div class="spinner-border text-secondary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>)

                        }





                    </div>



                    <div className="col-md-5">

                        {appointment ?
                            (


                                <div class="card mb-3" >
                                    <div class="row">
                                        <div class="col-4">
                                            <div class="text-center">
                                                <img src={appointment.barber_id.image} class="img-fluid rounded mx-auto d-block" alt="..." />
                                            </div>

                                        </div>
                                        <div class="col-8">
                                            <div class="card-body">
                                                <h5 class="card-title">{appointment.barber_id.name}</h5>
                                                <p class="card-text">{appointment.barber_id.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            (<div class="spinner-border text-secondary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>)

                        }




                    </div>

                    <div className="col-md-8">
                        <h5>Servicios </h5>
                        {appointment ? appointment.services.map(service => (
                            <div className="card mt-2 rounded-0">
                                <div className="card-body py-1">

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="">{service.name}</div>
                                        </div>
                                        <div className="col-6 text-right">
                                            <div className="">${service.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))

                            :
                            (<div class="spinner-border text-secondary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>)

                        }

                        <div className="row">
                            <div className="col-6">
                                <div className=""></div>
                            </div>
                            <div className="col-6 text-right">
                                <div className="p-2">
                                    <span className="text-dark p-2"> ${appointment && appointment.services.reduce(
                                        (accumulator, currentValue) => accumulator + currentValue.price
                                        , 0
                                    ).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>



                    </div>

                    <div className="col-md-4 ">
                        <p className='mt-4'>Nota : Por favor no faltar a la citas agendada, si no puede asistir por fuerza mayor cancele su cita con tiempo.</p>
                    </div>

                    <div className="col-12">
                        <div class="text-center"> <button type="button" class="btn btn-outline-danger" onClick={() => { history.goBack() }} > <i class="fas fa-arrow-left mr-3"></i> <span className="text-center h5">Volver</span> </button></div>
                    </div>
                </div>

            </div>




        </>
    )
}