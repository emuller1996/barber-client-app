import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Appointment.css";
import CardAppointment from './CardAppointment';

export default function Appointment() {

    const [appointments, setAppointments] = useState([]);
    const [barbers, setBarbers] = useState(undefined);
    const [dateSearch, setDateSearch] = useState(new Date().toISOString().substring(0, 10));
    const [barberSearch, setBarberSearch] = useState('all');



    useEffect(() => {
        getAppointments(barberSearch, dateSearch)
        getBarbers()
    }, [barberSearch, dateSearch])


    const getBarbers = async () => {

        const result = await axios.get('/barber/');
        setBarbers(result.data.barberos);
        /* console.log(result.data.barberos) */
    }
    const getAppointments = async (barber, date) => {
        let barberS = barber;
        if (barber === undefined) return false
        if (date === undefined) return false
        if (barber === "all") barberS = "all"

        setAppointments(undefined)
        const result = await axios.get(`/appointment/${barberS}/${date}`);
        setAppointments(result.data.appointments);
        console.log(result.data.appointments);
    }

    const changeAppointmentState = async (id, state) => {
        console.log(id, state)
        try {
            const result = await axios.patch(`appointment/${id}/${state}`);
            console.log(result)
           
            getAppointments(barberSearch, dateSearch)

        } catch (error) {

        }



    }


    return (

        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="date_search">Fecha </label><input type="date" value={dateSearch} name="date_search" onChange={e => setDateSearch(e.target.value)} id="date_search" className="form-control text-center input-appointment" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="barber_selected">Barbero</label>
                        <select name="barber_selected" id="barber_selected" onChange={e => { setBarberSearch(e.target.value) }} className='form-control custom-select input-appointment rounded-0'>
                            <option value="all">Todos</option>
                            {
                                barbers && barbers.map(b => (
                                    <option value={b._id}>{b.name} </option>
                                ))
                            }

                        </select>
                    </div>
                </div>

                <div className=" mt-4">
                    <div className="row">
                        {appointments && appointments.length === 0 && <div className="col-12" > No hay Coordinates </div>}
                        {appointments ? (appointments.map(a => (
                            <CardAppointment a={a} changeAppointmentState={changeAppointmentState} />
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