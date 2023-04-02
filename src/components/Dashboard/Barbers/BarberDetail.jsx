import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export default function BarberDetail() {
  const params = useParams();
  const history = useHistory();
  const [barber, setBarber] = useState(undefined);
  const [services, setServices] = useState([]);
  const [servicesSelected, setServicesSelected] = useState([]);
  const [token, setToken] = useLocalStorage("token", undefined);

  useEffect(() => {
    getBarber();
    getServices();
  }, []);

  const handleInputBarber = (e) => {
    setBarber({ ...barber, [e.target.name]: e.target.value });
  };
  const getBarber = async () => {
    try {
      const result = await axios.get(`/barber/${params.idBarber}`);
      console.log(result.data.barber);
      setBarber(result.data.barber);
      setServicesSelected(result.data.barber.services.map((s) => s._id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getServices = async () => {
    setServices(undefined);

    const result = await axios.get(`/services/`);
    setServices(result.data.services);
    console.log(result.data.services);
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

  const updateBarber = async () => {
    delete barber.services;
    /* console.log(barber);
    console.log(servicesSelected); */
    console.log(Object.assign(barber, { services: servicesSelected }));

    try {
      const result = await axios.put(
        `/barber/${barber._id}`,
        Object.assign(barber, { services: servicesSelected }),
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      toast.success(result.data.message);
      console.log(result);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container bg-light p-3">
      <button
        onClick={() => {
          history.goBack();
        }}
        type="button"
        class="close float-right py-1"
        aria-label="Close"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <h4> {barber ? barber.name : " . . ."}</h4>

      <div className="row">
        <div className="col-md-6">
          <div class="row ">
            <div class="form-group col-12">
              <label for="nameBarber">Nombre barbero</label>
              <input
                type="text"
                class="form-control input-appointment"
                name="name"
                value={barber ? barber.name : ""}
                id="nameBarber"
                onChange={handleInputBarber}
              />
            </div>
            <div class="form-group col-12">
              <label for="nameBarber">Rol barbero</label>
              <input
                type="text"
                class="form-control input-appointment"
                name="role"
                value={barber ? barber.role : ""}
                onChange={handleInputBarber}
                id="nameBarber"
              />
            </div>
            <div class="form-group col-12">
              <label for="nameBarber">imagen barbero</label>
              <input
                type="text"
                class="form-control input-appointment"
                name="name"
                value={barber ? barber.image : ""}
                id="nameBarber"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="row">
            {services &&
              services.length > 0 &&
              services.map((s) => (
                <div className="col-md-6 col-xl-4">
                  <label className="w-100" htmlFor={s.name}>
                    <div className="card w-100 rounded-0">
                      <div class="card-header bg-light">
                        <input
                          checked={barber && servicesSelected.includes(s._id)}
                          onChange={handleInputServicesAppointment}
                          className="float-right mt-1"
                          type="checkbox"
                          name="services"
                          id={s.name}
                          value={s._id}
                        />
                        <span>{s.name}</span>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div className="col-12">
          <button
            type="button"
            onClick={updateBarber}
            class="btn btn-primary w-50"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
}
