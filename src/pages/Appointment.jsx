import React from 'react';
import { Link } from 'react-router-dom';

export default function Appointment (){


    return(
        <>
        {/* <!-- Page Header Start --> */}
        <div class="page-header">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2>Agendar Cita</h2>
                        </div>
                        <div class="col-12">
                            <Link to="/">Inicio</Link>
                            <Link to="/Citas">Citas</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}
        </>
    )
}