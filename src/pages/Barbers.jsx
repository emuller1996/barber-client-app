import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Barbers() {

    const [barbers, setBarbers] = useState();

    useEffect(() => {
        getBarbers();
    }, [])

    const getBarbers = async () => {
        console.log('1', barbers)

        const result = await axios.get('/barber');
        console.log(result.data);
        setBarbers(result.data.barberos)
        console.log('2', barbers)

    }
    return (
        <>
            {/* <!-- Page Header Start --> */}
            <div class="page-header">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2>Barberos</h2>
                        </div>
                        <div class="col-12">
                            <Link to="/">Inicio</Link>
                            <Link to="/Barberos">Barberos</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}


            {/* <!-- Team Start --> */}
            <div class="team">
                <div class="container">
                    <div class="section-header text-center">
                        <p>Our Barber Team</p>
                        <h2>Meet Our Hair Cut Expert Barber</h2>
                    </div>
                    <div class="row">

                        {
                            barbers ? barbers.map( barber => (
                                <div class="col-lg-3 col-md-6">
                                    <div class="team-item">
                                        <div class="team-img">
                                            <img src={barber.image} alt="Team Image" />
                                        </div>
                                        <div class="team-text">
                                            <h2>{barber.name}</h2>
                                            <p>{barber.role}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-12 text-center">
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            )
                        }
                        
                        

                    </div>
                </div>
            </div>
            {/* <!-- Team End --> */}

        </>
    )
}