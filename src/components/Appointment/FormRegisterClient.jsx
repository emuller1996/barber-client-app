import axios from 'axios';
import React, { useState } from 'react';


export default function FormRegisterClient() {


    const [clientRegister, setClientRegister] = useState({
        name:'',
        phoneNumber : 0,
        age : 0
    });

    const handleInput = function (e) {

        setClientRegister({
            ...clientRegister,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(clientRegister);
        saveClientRegister()
        
    }

    const saveClientRegister = async () => {
        try {
            const result = await axios.post('/client', clientRegister,{headers: {
                'Content-Type': 'application/json'
            }});
            console.log(result);
            alert("Cliente Registrado con exito")
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <form autoComplete='off' onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className="col-12 mb-2">
                        <input
                            type="number"
                            class="form-control input-appointment"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Numero de Telefono *"
                            required="required"
                            value={clientRegister.phoneNumber===0 ? '' : clientRegister.phoneNumber}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="col-9 mb-2">
                        <input
                            type="text"
                            class="form-control input-appointment"
                            id="name"
                            name="name"
                            placeholder="Nombre *"
                            required="required"
                            onChange={handleInput}
                            value={clientRegister.name}
                        />
                    </div>
                    <div className="col-3 mb-2">
                        <input
                            type="number"
                            class="form-control input-appointment"
                            id="age"
                            name="age"
                            placeholder="Edad"
                            onChange={handleInput}
                            value={clientRegister.age}
                        />
                    </div>

                    <div className="col-6 mb-2">
                        <input
                            type="text"
                            class="form-control input-appointment"
                            id="email"
                            name="email"
                            placeholder="Correo *"
                            required="required"
                            onChange={handleInput}
                            value={clientRegister.email}
                        />
                    </div>

                    <div className="col-6 mb-2">
                        <input
                            type="text"
                            class="form-control input-appointment"
                            id="address"
                            name="address"
                            placeholder="Dirrecion"
                            required="required"
                            onChange={handleInput}
                            value={clientRegister.address}
                        />
                    </div>




                </div>


                <button type="button" class="btn btn-danger rounded-0" data-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-registrame">Registarme</button>

            </form>

        </>
    )
}