import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./FomAppointment.css";
import FormRegisterClient from "./FormRegisterClient";
import HoursAppointment from "./HoursAppointment";
import formartNumber from "../../hooks/formartNumber";

export default function FormAppointment() {
  const [client, setClient] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState(
    "Telefono es requerido."
  );
  const [barbersAll, setBarbersAll] = useState();
  const [barberSelected, setBarbersSelected] = useState();
  const [services, setServices] = useState([]);
  const [servicesSelected, setServicesSelected] = useState([]);
  const [hours, setHours] = useState();
  const [hoursAvailable, setHoursAvailable] = useState(undefined);
  const [dateAppointment, setDateAppointment] = useState();

  const history = useHistory();

  useEffect(() => {
    getAllBarbers();
  }, []);

  useEffect(() => {
    getServices(barberSelected);
    getHoursAvailable(barberSelected, dateAppointment);
    setHoursAvailable(undefined);
    setHours(undefined);
    setServicesSelected([]);
    console.log(hours);
  }, [barberSelected, dateAppointment]);

  const getServices = async (barberSelected) => {
    setServices(undefined);
    if (barberSelected) {
      const result = await axios.get(`/barber/${barberSelected}`);
      setServices(result.data.barber.services);
    }
  };

  const getHoursAvailable = async (barberSelected, dateAppointment) => {
    if (barberSelected && dateAppointment) {
      const result = await axios.get(
        `/appointment/hoursavailable/${barberSelected}/${dateAppointment}`
      );
      setHoursAvailable(result.data.hours);
    }
  };

  const getAllBarbers = async () => {
    const result = await axios.get("/barber");
    setBarbersAll(result.data.barberos);
  };

  const validateClient = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(`/client/${phoneNumber}`);
      console.log(result.data.client);
      setClient(result.data.client);
    } catch (error) {
      setClient(null);
    }
  };
  function validateName(input) {
    let errors = undefined;
    if (!input) {
      errors = "Telefono es requerido.";
    } else if (!/^[A-Z]+$/i.test(input.name)) {
      errors = "Nombre invalido (Solo Letras!!)";
    }
    return errors;
  }

  const handleInputNumberPhone = function (e) {
    setPhoneNumber(e.target.value);
    setPhoneNumberError(validateName(e.target.value));
  };

  const handleInputDateAppointment = function (e) {
    setDateAppointment(`${e.target.value}`);
  };
  const handleInputServicesAppointment = (e) => {
    console.log("handleInputServicesAppointment");
    console.log(e.target.value);
    const servicesIn = servicesSelected.find((t) => t === e.target.value);
    if (servicesIn) {
      setServicesSelected(servicesSelected.filter((t) => t !== e.target.value));
    } else {
      setServicesSelected([...servicesSelected, e.target.value]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("handleFormSubmit");

    const data = {};
    Object.assign(data, {
      barber_id: barberSelected,
      date: `${dateAppointment}T${hours}`,
      hour: hours,
      client_id: client._id,
      services: servicesSelected,
      state: "AGENDADA",
    });
    console.log("data", data);
    try {
      const result = await axios.post("/appointment/", data);
      console.log(result.data);
      toast.success(`${result.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      history.push(`Citas/Confirmacion/${result.data.appointment._id}`);
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <div class="appointment-form">
        <p> Ingrese los datos para reservar si cita </p>
        <div id="success"></div>

        <form name="sentMessage" id="contactForm" onSubmit={handleFormSubmit}>
          <div className="bg-cafe border mb-4 p-4">
            <div className="row">
              <div className=" col-md-6 col-xl-9 mb-2">
                <input
                  type="number"
                  class={
                    !phoneNumberError
                      ? "form-control input-appointment"
                      : "form-control input-error"
                  }
                  id="numberPhone"
                  name="numberPhone"
                  placeholder="Numero de Telefono"
                  value={phoneNumber}
                  required="required"
                  onChange={handleInputNumberPhone}
                />
              </div>
              <div className=" col-md-6 col-xl-3 mb-2">
                <button
                  className="btn  btn-registrame w-100 "
                  onClick={validateClient}
                  disabled={phoneNumberError ? true : false}
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
                  <div className="col-8 text-left">
                    <span> Correo : {client.email}</span>
                  </div>
                  <div className="col-4 text-left">
                    <i class="text-success fas fa-thumbs-up fa-2x"></i>
                  </div>
                </>
              ) : (
                <div className="col">
                  {" "}
                  <p> No te encuentras registrado.</p>{" "}
                  <button
                    type="button"
                    class="btn btn-registrame"
                    data-toggle="modal"
                    data-target="#ModalRegister"
                  >
                    Registarme
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-cafe border mb-4 p-2">
            <h5>Barberos</h5>
            <p>Seleccione el Barbero</p>
            <div className="row m-2 ">
              {barbersAll ? (
                barbersAll.map((b) => (
                  <div key={b._id} className={ barberSelected===b._id ?"col-4 radio-barber" : "col-4 radio-barber-selected "}>
                    <label htmlFor={b._id} className="w-100 m-0 p-0 ">
                      <input
                        type="radio"
                        name="barber"
                        id={b._id}
                        value={b._id}
                        className="barber-check"
                        onClick={(e) => {
                          setBarbersSelected(e.target.value);
                        }}
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
                ))
              ) : (
                <div className="col-12 text-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-cafe border mb-4 p-2">
            <input
              type="time"
              hidden
              value={hours}
              onChange={(e) => {
                setHours(e.target.value);
              }}
              name="timeApp"
              id="timeApp"
            />

            <h6>Selecione la Fecha. </h6>
            <input
              type="date"
              name="date"
              id="date"
              className="form-control input-appointment  mx-auto w-75 mb-3"
              onChange={handleInputDateAppointment}
            />

            {hoursAvailable && (
              <>
                <h6 className="mb-3"> Selecione la Hora </h6>

                <HoursAppointment
                  hoursAvailable={hoursAvailable}
                  setHours={setHours}
                  dateAppointment={dateAppointment}
                  setDateAppointment={setDateAppointment}
                  hours={hours}
                />
              </>
            )}
          </div>

          <div className="bg-cafe border mb-4 p-2">
            <h6>Servicios</h6>
            <div className="row mx-1">
              {services && barberSelected ? (
                services.map((service) => (
                  <div key={service._id} class="col-lg-3 col-md-4 col-sm-6">
                    <div class={servicesSelected.includes(service._id)  ? "card-service-selected mb-3" : "card-service mb-3"}>
                      <label htmlFor={service._id} className="w-100 m-0 p-0 ">
                        <input
                          type="checkbox"
                          name="services"
                          id={service._id}
                          value={service._id}
                          className="checkbox"
                          onClick={handleInputServicesAppointment}
                            
                        />

                        <div className="row">
                          <div className="col">
                            <small>{service.name}</small>
                            <p>{formartNumber(service.price)}</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              class="btn btn-info"
              disabled={
                !barberSelected || !phoneNumber || !hours ? true : false
              }
              type="submit"
              id="sendMessageButton"
            >
              Agendar Cita
            </button>
          </div>
        </form>

        <div
          class="modal fade"
          id="ModalRegister"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog ">
            <div class="modal-content bg-cafe rounded-0">
              <div class="modal-header bg-dark rounded-0">
                <h5 class="modal-title text-white" id="exampleModalLabel">
                  Registarme{" "}
                </h5>
                <button
                  type="button"
                  class="close text-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <FormRegisterClient />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
