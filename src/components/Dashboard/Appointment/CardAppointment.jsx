import React from 'react';


export default function CardAppointment({ a, changeAppointmentState }) {



    return (
        <div className="col-md-6 col-xl-4">
            <div className="card-appointment rounded-0 p-2">

                <div className="row align-items-center">
                    <div className="col-12 text-left">
                        <small>Barbero : </small><span className=' h5'>{a.barber_id.name}</span>
                    </div>
                    <div className="col-5 text-left">
                        <small>Hora: </small><span>{a.hour}</span>
                    </div>
                    <div className="col-7 text-right">
                        { a.state ==='AGENDADA' && (<span className="px-3 border bg-info shadow-sm text-white"> {a.state} </span> )}
                        { a.state ==='ASISTIDA' && (<span className="px-3 border bg-success shadow-sm text-white"> {a.state} </span> )}
                        { a.state ==='CANCELADA' && (<span className="px-3 border bg-danger shadow-sm text-white"> {a.state} </span> )}


                        
                    </div>


                    <div className="col-12 text-left">
                        <small>Cliente: </small><span className="h5"> {a.client_id.name} </span>
                    </div>
                    <div className="col-12 text-center">
                        <small >Servicios : {a.services.length} </small>
                        <div className="row">
                            {a.services.length !== 0 ? a.services.map(s => (
                                <div className="col-6 text-left">
                                    <span className="">►  {s.name}</span>
                                </div>
                            )) : (<div className="col-12 text-left">
                                <span className=""> Sin Servicios</span>
                            </div>)}
                            <div className="col-12 ">
                                <div className="my-2 hr"></div>
                            </div>

                            <div className="col-7">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" onClick={ () => changeAppointmentState(a._id,'ASISTIDA')  } class="btn btn-success btn-sm rounded-0">ASISTIDA</button>
                                    <button type="button" onClick={ () => changeAppointmentState(a._id,'CANCELADA')  } class="btn btn-danger btn-sm rounded-0">CANCELADA</button>
                                </div>
                            </div>
                            <div className="col-5  align-self-end text-right">
                                <span className="text-success h5">  $ {a.services.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.price
                                    , 0
                                )}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}