import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Services() {

    const [services, setServices] = useState();


    useEffect(() => {
        getServices();
    }, [])

    const getServices = async () => {
        console.log('1', services)

        const result = await axios.get('/Services');
        console.log(result.data);
        setServices(result.data.services)
        console.log('2', services)

    }


    return (
        <>
            {/* <!-- Page Header Start --> */}
            <div class="page-header">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2>Servicios</h2>
                        </div>
                        <div class="col-12">
                            <Link to="/">Inicio</Link>
                            <Link to="/Servicios">Servicios</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}
            {/* <!-- Service Start --> */}
            <div class="service">
                <div class="container">
                    <div class="section-header text-center">
                        <p>Servicios de Nuestra Barberia</p>
                        {/* <h2>Best Salon and Barber Services for You</h2> */}
                    </div>
                    <div class="row">

                        {
                            services ? services.map(s => (
                                <div class="col-lg-4 col-md-6">
                                    <div class="service-item border border-dark">
                                        <div class="service-img">
                                            <img src="img/service-1.jpg" alt="Image" />
                                        </div>
                                        <h3>{s.name}</h3>
                                        <p>
                                            {s.description}</p>
                                        <a class="btn" href="">Ver más</a>
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
                        {/* <div class="col-lg-4 col-md-6">
                            <div class="service-item border border-danger">
                                <div class="service-img">
                                    <img src="img/service-1.jpg" alt="Image" />
                                </div>
                                <h3>Hair Cut</h3>
                                <p>
                                    Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                                </p>
                                <a class="btn" href="">Learn More</a>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
            {/* <!-- Service End --> */}
        </>
    )
}