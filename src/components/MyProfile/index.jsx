import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import MyAppointmentComponent from "./MyAppointment";

export default function MyProfileComponent() {
  const { phoneNumber } = useParams();
  const [client, setClient] = useState(undefined);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    getClient();
    return () => {};
  }, []);

  const getClient = async () => {
    try {
      const result = await axios.get(`/client/${phoneNumber}`);
      console.log(result);
      setClient(result.data.client);
    } catch (error) {}
  };

  const handleInput = function (e) {
    setUpdated(true);
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdateClient = async (e) => {
    e.preventDefault();
    console.log(client);

    try {
      const result = await axios.put(`/client`, {
        client: client,
        id: client._id,
      });
      console.log(result);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="continer">
      <div className="row ">
        <div className="col-12 col-md-5 p-4">
          <p>Mis Datos</p>
          <form onSubmit={onUpdateClient} action="">
            <div className="row">
              <div className="col-12 mb-2">
                <input
                  type="number"
                  class="form-control input-appointment"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Numero de Telefono"
                  value={client && client.phoneNumber}
                  onChange={handleInput}
                  disabled
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
                  value={client && client.name}
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
                  value={client && client.age}
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
                  value={client && client.email}
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
                  value={client && client.address}
                />
              </div>
              <div className="col-12">
                <button
                  disabled={!updated}
                  type="submit"
                  class="btn btn-registrame"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-12 col-md-7 p-4">
          <p>Mis Citas </p>

          {
            client && (<MyAppointmentComponent id={client && client._id} />)
          }
          
          
        </div>
      </div>
    </div>
  );
}
