import React from 'react';


export default function Barbers() {


    return (
        <>
            <div className="row">
                <div className="col-md-3 col-xl-2 col-5  ">
                    <button type="button" class="btn btn-secondary w-100">Nuevo Barbero</button>
                </div>
                <div className="col-12 col-md-6">
                    <input type="text" name="barberNameSearch" id="barberNameSearch" className="form-control rounded-0"  />
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12 col-md-6 col-xl-4">
                    <div className="card rounded-0 border-secondary card-barber p-1">
                        <div className="row">
                            <div className="col-6">
                                <img src="/img/team-1.jpg" alt="ssss" className="img-fluid"/>
                            </div>
                            <div className="col-6">
                                <p>Estefano </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}