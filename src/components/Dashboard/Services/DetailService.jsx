import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormService from "./FormServices";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export default function DetailService() {
  const params = useParams();
  const history = useHistory();
  const [service, setService] = useState({});
  const [token, setToken] = useLocalStorage("token", undefined);

  useEffect(() => {
    getService();
    console.log(token);
  }, []);

  const getService = async () => {
    try {
      const result = await axios.get(`/services/${params.idService}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      console.log(result.data.service);
      setService(result.data.service);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInput = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    service.id = service._id;

    try {
      const result = await axios.put(
        "/services",
        {
          serviceUpdated: service,
          id: service._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      console.log(result.data);
      toast.success("Servicio Actualizado");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container bg-light">
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
      <h5>Detalles del Servicios {service ? service.name : " . . ."}</h5>

      <div className="row">
        <div className="col-6">
          <FormService
            input={service}
            handleSumbit={handleSumbit}
            handleInput={handleInput}
          />
        </div>
      </div>
    </div>
  );
}
