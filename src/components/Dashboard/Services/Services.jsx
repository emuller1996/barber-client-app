import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ModalService from "./ModalService";

export default function Services() {
  const [services, setServices] = useState();
  const [input, setInput] = useState({});

  useEffect(() => {
    getAllServices();
  }, []);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      const result = await axios.post("/services", input);
      console.log(result.data);
    } catch (error) {
      alert(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  const getAllServices = async () => {
    try {
      const result = await axios.get("/services");

      console.log(result.data);
      setServices(result.data.services);
    } catch (error) {}
  };

  return (
    <>
      <h2>Services</h2>
      <div className="row p-2">
        <div className="col-6 col-md-3">
          <button
            className="w-100 btn btn-info rounded-0"
            data-toggle="modal"
            data-target="#ModalServiceDash"
          >
            Crear Servicio
          </button>
        </div>
        <div className="col-6 col-md-3">
          <button disabled className="w-100 btn btn-info rounded-0">
            ?
          </button>
        </div>

        <div className="col-12">
          {services && services.length === 0 && (
            <p className="py-2"> Sin Servicios </p>
          )}

          <div className="row mt-2 ">
            {services ? (
              services.map((service) => (
                <div className="col-md-4">
                  <div className="card rounded-0 border-secondary my-2">
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <img
                          style={{ width: "7em" }}
                          src="https://i.pinimg.com/736x/3f/75/71/3f7571e0be7026c816e52a747e3d30a4.jpg"
                          class="card-img-top"
                          alt="service_img"
                        />
                      </div>

                      <div className="col-12">
                        <div class="card-body">
                          <h4 className="p-0"> {service.name}</h4>
                          <p className="font-weight-bold">{service.price}</p>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/Dashboard/Servicios/${service._id}`}
                      className="btn btn-dark rounded-0"
                    >
                      Ver Servicio
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 py-4">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalService
        handleSumbit={handleSumbit}
        handleInput={handleInput}
        input={input}
      />
    </>
  );
}
