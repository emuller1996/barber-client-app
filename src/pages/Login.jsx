import React from 'react';
import { Link } from 'react-router-dom';
import FormLogin from '../components/FormLogin/FormLogin';


export default function Login() {


    return (
        <>
            <div class="page-header">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2>Inicio de Session</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="card border-0 rounded-0 shadow border-cafe">
                    <FormLogin />
                </div>

            </div>
        </>
    )
}