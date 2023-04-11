import React, { useEffect, useState } from "react";
import FormRegisterClient from "../Appointment/FormRegisterClient";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MyProfileComponent() {


    const { phoneNumber } = useParams()
     const [client, setClient] = useState(undefined)

    useEffect(() => {
        
        getClient()
        return () => {
            
        };
    }, []);


    const getClient = async ( )=> {
        try {
            const result = await axios.get(`/client/${phoneNumber}`);
            console.log(result);

          } catch (error) {

          }
    }
  return (
    <div className="continer">
      <div className="row ">
        <div className="col-12 col-md-5 p-4">
          <p>Mis Datos {phoneNumber}</p>
          <div className="row">
            <div className="col-12 mb-2">
              <input
                type="number"
                class="form-control input-appointment"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Numero de Telefono"
                
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-7 p-4">
          <p>Mis Citas </p>
          <div class="card text-start">
            <div class="card-body">
              <h4 class="card-title">Title</h4>
              <p class="card-text">Body</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
