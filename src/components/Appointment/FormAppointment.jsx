import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FomAppointment.css";

export default function FormAppointment() {
  const [client, setClient] = useState({});
  const [phoneNumber, setPhoneNumber] = useState();
  const [barbersAll, setBarbersAll] = useState();
  const [barberSelected, setBarbersSelected] = useState();


  useEffect(() => {
    getAllBarbers();
  }, []);

  const getAllBarbers = async () => {
    const result = await axios.get("/barber");
    setBarbersAll(result.data.barberos);
  };

  const validateClient = async (e) => {
    e.preventDefault();
    console.log(phoneNumber);

    try {
      const result = await axios.get(`/client/${phoneNumber}`);
      console.log(result.data.client);
      setClient(result.data.client);
    } catch (error) {
      console.log(error.response.data.message);
      setClient(null);
    }
  };

  return (
    <>
      <div class="appointment-form">
        <p> Ingrese los datos para reservar si cita </p>
        <div id="success"></div>

        <form name="sentMessage" id="contactForm" novalidate="novalidate">
          <div className="bg-cafe border mb-4 p-4">
            <div className="row">
              <div className=" col-md-6 col-xl-9 mb-2">
                <input
                  type="number"
                  class="form-control input-appointment"
                  id="numberPhone"
                  name="numberPhone"
                  placeholder="Numero de Telefono"
                  value={phoneNumber}
                  required="required"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
              <div className=" col-md-6 col-xl-3 mb-2">
                <button
                  className="btn  btn-secondary w-100 "
                  onClick={validateClient}
                >
                  <i class="fas fa-check-double mr-2"></i>Validar
                </button>
              </div>

              {client ? (
                <>
                  <div className="col-7 text-left">
                    <span> Nombre : {client.name}</span>
                  </div>
                  <div className="col-5 text-left">
                    <span> Edad : {client.age}</span>
                  </div>
                  <div className="col-9 text-left">
                    <span> Correo : {client.email}</span>
                  </div>
                </>
              ) : (
                <div className="col">
                  {" "}
                  <p> No registado</p>{" "}
                </div>
              )}

              {/* <div className="col-8">
                <input
                  type="text"
                  class="form-control input-appointment"
                  id="name"
                  name="name"
                  placeholder="Nombre*"
                  required="required"
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  class="form-control input-appointment"
                  id="age"
                  name="age"
                  placeholder="Edad"
                />
              </div>
              <div className="col-7">
                <input
                  type="email"
                  class="form-control input-appointment"
                  id="email"
                  name="email"
                  placeholder="Correo"
                />
              </div>
              <div className="col-5">
                <input
                  type="text"
                  class="form-control input-appointment"
                  id="address"
                  name="address"
                  placeholder="Dirrecion"
                />
              </div> */}
            </div>
          </div>

          <div className="bg-cafe border mb-4 p-2">
            <h5>Barberos</h5>
            <p>Seleccione el Barbero</p>
            <div className="row m-1 ">
              {barbersAll ? barbersAll.map( b => (
                <div key={b._id} className="col-4 border border-secondary ">
                <label htmlFor={b._id} className="w-100 m-0 p-0 ">
                  <input
                    type="radio"
                    name="barber"
                    id={b._id}
                    value={b._id}
                    className="barber-check"
                    onClick={(e)=>{ setBarbersSelected(e.target.value)} }
                  />

                  <div className="row">
                    <div className="col-12">
                      <img
                        src={b.image}
                        alt=""
                        width={"70px"}
                        height={"70px"}

                      />
                    </div>
                    <div className="col">
                      <small>{b.name}</small>
                    </div>
                  </div>
                </label>
              </div>
              )) : (
                <div className="col-12 text-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )}

              {/* <div className="col-4 border border-secondary ">
                <label htmlFor="barger" className="w-100 m-0 p-0 ">
                  <input
                    type="checkbox"
                    name="barber"
                    id="barger"
                    className="barber-check"
                  />

                  <div className="row">
                    <div className="col-12">
                      <img
                        src="https://technext.github.io/BarberX/img/team-2.jpg"
                        alt=""
                        width={"70px"}
                      />
                    </div>
                    <div className="col">
                      <small>Estefano Muller</small>
                    </div>
                  </div>
                </label>
              </div> */}
            </div>
          </div>

          <div class="control-group">
            <input
              type="number"
              class="form-control"
              id="numberPhone"
              name="numberPhone"
              placeholder="Numero de Telefono"
              required="required"
            />
            <p class="help-block text-danger"></p>
          </div>

          <div>
            <button class="btn" type="submit" id="sendMessageButton">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
