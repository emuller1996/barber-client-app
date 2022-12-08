import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Appointment from '../components/Dashboard/Appointment/Appointment';

export default function Dashboard() {


    return (

        <>
            <div class="page-header">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2>Dashboard</h2>
                            <ul class="nav justify-content-center">
                                <li class="nav-item">
                                    <Link class="nav-link active" to={'/Dashboard/Barberos'}>Barberos</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to={'/Dashboard/Citas'}>Citas</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to={'/Dashboard/Servicios'}>Servicios</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to={'/Dashboard/Clientes'} >Clientes</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="border bg-ligth shadow p-2">
                    <Switch>
                        <Route exact path={'/Dashboard/Citas'} >
                            <Appointment />
                        </Route>
                        <Route exact path={'/Dashboard/Barberos'} >
                        Barberos
                        </Route>
                        <Route exact path={'/Dashboard/Servicios'} >
                        Servicios
                        </Route>
                        <Route exact path={'/Dashboard/Clientes'} >
                        Clientes
                        </Route>

                    </Switch>
                   
                </div>



            </div>

        </>
    )
}