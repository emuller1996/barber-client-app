import React from 'react';
import { Link } from 'react-router-dom';
import MyProfileComponent from '../components/MyProfile';


export default function MyProfile() {


    return (
        <>
            <div class="page-header">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2>Mi Perfil</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="card border-0 rounded-0 shadow border-cafe">
                    <MyProfileComponent />
                </div>
            </div>
        </>
    )
}