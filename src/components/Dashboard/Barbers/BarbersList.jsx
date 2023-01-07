import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Barber.css'

export default function BarbersList() {

    const [barbersAll, setBarbersAll] = useState([]);



    useEffect(() => {
        getBarbers()
    }, [])

    const getBarbers = async () => {

        const result = await axios.get('/barber/');
        setBarbersAll(result.data.barberos);
        /* console.log(result.data.barberos) */
    }


    return (
        <div className="row mt-4">
            {
                barbersAll.length !==0 ? barbersAll.map(b => (
                    <div className="col-12 col-md-6 col-xl-4 mb-3">
                        <div className="card card-barber rounded-0 border-secondary card-barber p-1">
                            <div className="row">
                                <div className="col-6">
                                    <img src={b.image} alt="ssss" className="img-fluid" style={{  maxHeight : '10em', minWidth : '10em', minHeight : '10em'}} />
                                </div>
                                <div className="col-6">
                                    <p>{b.name} </p>
                                    <p>{b.role} </p>
                                    <Link to={`/Dashboard/Barberos/${b._id}`} className="btn btn-dark rounded-0 w-100">
                                        Ver
                                    </Link>

                                </div>
                            </div>

                        </div>
                    </div>
                ))
                    : (<div className="col-12 py-4">
                    <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>)}

        </div>
    )
}