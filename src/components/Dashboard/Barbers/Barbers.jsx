import React from 'react';
import { ToastContainer } from 'react-toastify';
import BarbersList from './BarbersList';
import FormBarber from './FormBarber';

export default function Barbers() {


    return (
        <div className='p-2'>
            <div className="row">
                <div className="col-md-3 col-xl-2 col-5  ">
                    <button data-toggle="modal" data-target="#modalBaber" type="button" class="btn btn-secondary w-100 rounded-0">Nuevo Barbero</button>
                </div>
                <div className="col-12 col-md-6">
                    <input type="text" name="barberNameSearch" id="barberNameSearch" className="form-control rounded-0" />
                </div>
            </div>

            <BarbersList />


            <div class="modal  fade" id="modalBaber" tabindex="-1" aria-labelledby="modalBaber" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-cafe rounded-0">
                        <FormBarber />
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}