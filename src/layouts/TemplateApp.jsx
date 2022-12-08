import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Home from '../pages/Home'
import { Switch, Route } from 'react-router-dom'
import Services from '../pages/Services'
import Barbers from '../pages/Barbers'
import Footer from '../components/Footer/Footer'
import Appointment from '../pages/Appointment'
import Login from '../pages/Login'
import Dashboard from './Dashboard'


export default function TemplateApp() {


    return (
        <>
            <Navbar />
            <Switch>

                <Route exact path={'/'} >
                    <Home />
                </Route>
                <Route exact path={'/Servicios'} >
                    <Services />
                </Route>
                <Route exact path={'/Barberos'} >
                    <Barbers />
                </Route>
                <Route exact path={'/Citas'} >
                    <Appointment />
                </Route>
                <Route exact path={'/Login'} >
                    <Login />
                </Route>
                <Route  path={'/Dashboard'} >
                    <Dashboard />
                </Route>



            </Switch>
            <Footer />





        </>
    )
}