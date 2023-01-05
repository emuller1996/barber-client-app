import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

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
                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="card rounded-0 border-secondary card-barber p-1">
                            <div className="row">
                                <div className="col-6">
                                    <img src={b.image} alt="ssss" className="img-fluid" />
                                </div>
                                <div className="col-6">
                                    <p>{b.name} </p>
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