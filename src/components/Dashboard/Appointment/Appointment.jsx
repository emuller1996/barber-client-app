import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Appointment.css";

export default function Appointment() {

    const [appointments, setAppointments] = useState([]);
    const [barbers, setBarbers] = useState(undefined);
    const [dateSearch, setDateSearch] = useState(undefined);
    const [barberSearch, setBarberSearch] = useState('all');



    useEffect(() => {
        getAppointments(barberSearch, dateSearch)
        getBarbers()
    }, [barberSearch,dateSearch])


    const getBarbers = async () => {

        const result = await axios.get('/barber/');
        setBarbers(result.data.barberos);
        /* console.log(result.data.barberos) */
    }
    const getAppointments = async (barber, date) => {
        let barberS= barber;
        if(barber === undefined) return false
        if(date === undefined) return false
        if(barber === "all") barberS = "all"

        setAppointments(undefined)
        const result = await axios.get(`/appointment/${barberS}/${date}`);
        setAppointments(result.data.appointments);
        console.log(result.data.appointments);
    }


    return (

        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="date_search">Fecha </label><input type="date" name="date_search" onChange={ e => setDateSearch(e.target.value)} id="date_search" className="form-control text-center" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="barber_selected">Barbero</label>
                        <select name="barber_selected" id="barber_selected" onChange={ e => { setBarberSearch(e.target.value)}} className='form-control rounded-0'>
                        <option value="all">Todos</option>
                            {
                                barbers && barbers.map(b => (
                                    <option value={b._id}>{ b.name } </option>
                                ))
                            }

                        </select>
                    </div>
                </div>

                <div className=" mt-4">
                    <div className="row">
                        { appointments && appointments.length ===0 && <div className="col-12" > No hay Coordinates </div>}
                        {appointments ? (appointments.map(a => (
                            <div className="col-md-6 col-xl-4">
                                <div className="card-appointment rounded-0 p-2">
                                    <div className="bg-ligth  p-1 mb-2">
                                        <div className="row">
                                            <div className="col-5">
                                                <small> {a.hour} </small>
                                            </div>
                                            <div className="col-7">
                                                <span className="px-3 border bg-secondary text-white"> {a.state} </span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="bg-ligth  p-1 mb-2">
                                        <div className="row">

                                            <div className="col-12">
                                                <span className="h5"> {a.client_id.name} </span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="bg-ligth  p-1">
                                        <div className="row">
                                            {a.services.length !== 0 ? a.services.map(s => (
                                                <div className="col-12 text-left">
                                                    <span className="">►  {s.name}</span>
                                                </div>
                                            )) : (<div className="col-12 text-left">
                                                <span className=""> Sin Servicios</span>
                                            </div>)}

                                            <div className="col-12 text-right">
                                                <span className="text-success h5">  $ {a.services.reduce(
                                                    (accumulator, currentValue) => accumulator + currentValue.price
                                                    , 0
                                                )}</span>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        ))
                        ) :
                            (<div className="col-12 py-4">
                                <div class="spinner-border text-secondary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>)}
                        {/* <div className="col-md-4">
                            <div className="card rounded-0 p-2">
                                <div className="bg-ligth border p-1">
                                    <div className="row">
                                        <div className="col-5">
                                            <small> 08:00 AM </small>
                                        </div>
                                        <div className="col-7">
                                            <span className="px-3 border rounded-pill bg-secondary text-white"> AGENDADA </span>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}